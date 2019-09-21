import jwt from 'jsonwebtoken';

import models from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { users, profiles, roles } = models;

/**
 * @description UsersController class
 */
class UsersController {
  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async list(req, res) {
    try {
      const authors = await users.findAll({
        include: [
          {
            model: profiles,
            as: 'profile'
          },
          {
            model: roles,
            where: {
              name: 'author'
            }
          }
        ],
        attributes: { exclude: ['password'] }
      });
      if (authors.length === 0) {
        return StatusResponse.success(res, {
          message: 'No author found'
        });
      }
      return StatusResponse.success(res, {
        message: 'List of authors',
        users: authors
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `Something went wrong..${error}`
      });
    }
  }

  /**
   * @description  Method to verify a users email
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object
   */
  static async verifyEmail(req, res) {
    const { emailToken } = req.params;
    const decodedToken = jwt.decode(emailToken);

    if (!decodedToken) {
      return StatusResponse.badRequest(res, {
        message: 'The verification link is invalid. Check your email and try again'
      });
    }

    const { email } = decodedToken;

    try {
      const user = await users.findOne({
        where: { email }
      });

      if (!user) {
        return StatusResponse.notfound(res, {
          message: 'No user found'
        });
      }

      const updateUser = await users.update(
        {
          emailVerification: true
        },
        { where: { email } }
      );
      if (!updateUser) {
        return StatusResponse.badRequest(res, {
          message: 'Unable to verify your password try again'
        });
      }

      return StatusResponse.success(res, {
        message: 'Your email has been verified'
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: 'users profile not returned succesfully, please try again',
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }
}

export default UsersController;
