import bcrypt from 'bcryptjs';
import usersModel from '../models';
import StatusResponse from '../helpers/StatusResponse';
import UserModelQuery from '../lib/UserModelQuery';
import getToken from '../helpers/getToken';
import mailer from '../helpers/mailer';
import generateEmailToken from '../helpers/generateEmailToken';

/**
 * Signup validation class
 * classname should match file name and start with capital
 */
class AuthController {
  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} signUpCtrl response to user
   */
  static async signUp(req, res) {
    const { email, password, username } = req.body;
    const { users, roles, profiles } = usersModel;

    const genSalt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, genSalt);

    const emailToken = generateEmailToken(email);

    const link = `http://${req.headers.host}/api/v1/users/verify-email/${emailToken}`;

    try {
      let user = await UserModelQuery.getUserByEmail(email);

      if (user) {
        const payload = {
          message: 'This email has been taken'
        };
        return StatusResponse.conflict(res, payload);
      }

      user = await profiles.findOne({
        where: { username }
      });

      if (user) {
        const payload = {
          message: 'This username has been taken'
        };
        return StatusResponse.conflict(res, payload);
      }

      mailer.sendVerificationMail(email, username, link);

      const { id: roleId } = await roles.find({ where: { name: 'author' } });
      const newUser = await users.create(
        {
          email,
          roleId,
          password: hashPassword,
          profile: { username }
        },
        { include: [{ model: profiles, as: 'profile' }] }
      );

      const token = getToken(newUser.id, newUser.username);

      const payload = {
        message: 'user created succesfully',
        token,
        emailToken
      };

      return StatusResponse.created(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }

  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} login response to user
   */
  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await UserModelQuery.getUserByEmail(email);
      if (!user) {
        const payload = {
          message: 'email does not exist'
        };
        return StatusResponse.notfound(res, payload);
      }
      if (!bcrypt.compareSync(password, user.dataValues.password)) {
        const payload = {
          message: 'you have entered invalid credentials'
        };
        return StatusResponse.notfound(res, payload);
      }
      const { id, roleId, profile: { username } } = user;
      const token = getToken(id, username, roleId);
      user.dataValues.password = undefined;
      const payload = {
        message: 'user logged in succesfully',
        token
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }

  /**
   * @param {object} req Request Object
   * @param {object} res Response Object
   * @return {object} login response to user
   */
  static socialAuth(req, res) {
    const {
      id,
      profile: { username }
    } = req.user;
    const token = getToken({ id, username });
    const payload = {
      message: 'user logged in succesfully',
      token
    };
    return StatusResponse.success(res, payload);
  }
}

export default AuthController;
