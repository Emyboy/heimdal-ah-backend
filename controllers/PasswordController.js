import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserModel from '../models';
import Response from '../helpers/StatusResponse';
import mailer from '../helpers/mailer';
import UserModelQuery from '../lib/UserModelQuery';

/** @description usersController class
 * @return {object} the response object
 * @public
 */
class PasswordResetController {
  /** @description it sends a mail to a user that forgot his password
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async forgotPassword(req, res) {
    try {
      const user = await UserModelQuery.getUserByEmail(req.body.email);
      if (!user) {
        return Response.notfound(res, { message: 'user not avalaible' });
      }
      const { id, email, profile: { username } } = user;
      // create token
      const token = jwt.sign(
        { id, email, username },
        process.env.TOKEN_SECRET,
        {
          expiresIn: 86400
        }
      );

      const emailSubject = 'Please rerset your password';
      const emailBody = `
     <div>
         <h1> please follow this link to update your password </h1>
         ${token}
     </div>`;
      // send email
      const emailContent = { emailSubject, emailBody };
      mailer.sendCustomMail(req.body.email, emailContent);

      user.update({
        resettingPassword: true
      });

      return Response.success(res, { message: 'Email was sent successfully' });
    } catch (err) {
      return Response.internalServerError(res, { message: 'Server error' });
    }
  }

  /** @description updates the existing password in the database
   * @param {object} req is the request parameter
   * @param {object} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async resetPassword(req, res) {
    const { users } = UserModel;
    const { id } = req.decoded;
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    try {
      const user = await users.findOne({
        where: { id }
      });

      if (!user) {
        return Response.notfound(res, { message: 'user not avalaible' });
      }
      if (!user.resettingPassword) {
        return Response.badRequest(res, {
          message: 'this link has already been used to reset your password'
        });
      }
      // update password
      const updatedPassword = await user.update({
        password: hashedPassword,
        resettingPassword: false
      });
      if (updatedPassword) {
        return Response.success(res, {
          message: 'password update was successful'
        });
      }

      return Response.internalServerError(res, {
        message: 'password was not updated'
      });
    } catch (error) {
      return Response.internalServerError(res, {
        message: 'Server Error'
      });
    }
  }
}
export default PasswordResetController;
