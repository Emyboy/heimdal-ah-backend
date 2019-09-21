import UserModelQuery from '../lib/UserModelQuery';
import Response from '../helpers/StatusResponse';
/**
 * Signup validation class
 * classname should match file name and start with capital
 */
class UserValidation {
  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @param {object} next Move to the next middleware or function
   * @return {object} User validation response to user
   */
  static validateUserSignUp(req, res, next) {
    UserValidation.checkUserEmail(req);
    UserValidation.checkPassword(req);
    UserValidation.checkUserName(req);
    UserValidation.showError(req, res, next);
  }

  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @param {object} next Move to the next middleware or function
   * @return {object} User validation response to user
   */
  static validateUserLogin(req, res, next) {
    UserValidation.checkUserLogin(req);
    UserValidation.checkPassword(req);
    UserValidation.showError(req, res, next);
  }

  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} User validartion response to user
   */
  static checkUserEmail(req) {
    req.checkBody('email', 'please enter an email').notEmpty();
    req.checkBody('email', 'please enter a valid email').isEmail();
  }

  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} User validation response to user
   */
  static checkPassword(req) {
    req.checkBody('password', 'password cannot be empty').notEmpty();
    req.checkBody('password', 'password must be at least 8 characters').isLength({ min: 8 });
    req
      .checkBody('password', 'password must contain a letter and number')
      .matches(/^((?=.*\d))(?=.*[a-zA-Z])/);
  }

  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} User validation response to user
   */
  static checkUserName(req) {
    req.checkBody('username', 'please enter a Username, it cannot be empty').notEmpty();
    req
      .checkBody(
        'username',
        'please enter a valid username can contain a letter or mixture of both letter and number'
      )
      .isAlphanumeric();
    req
      .checkBody('username', 'please enter a valid username, cannot be more than 20 characters')
      .isLength({ max: 20 });
  }


  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @return {object} User validation response to user
   */
  static checkUserLogin(req) {
    if (!req.body.email) {
      req.checkBody('username', 'please enter a valid username or email, it cannot be empty').notEmpty();
      req
        .checkBody(
          'username',
          'please enter a valid username can contain a letter or mixture of both letter and number'
        )
        .isAlphanumeric();
      req
        .checkBody('username', 'please enter a valid username or email, Username cannot be more than 20 characters')
        .isLength({ max: 20 });
    } else if (!req.body.username) {
      req.checkBody('email', 'please enter an email').notEmpty();
      req.checkBody('email', 'please enter a valid email').isEmail();
    }
  }


  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @param {object} next move to the next function or middleware
   * @return {object} User validation response to user
   */
  static async showError(req, res, next) {
    try {
      const errors = await req.validationErrors();
      const err = [];
      if (errors) {
        errors.forEach(({ param, msg }) => {
          if (!err[param]) {
            err[param] = {
              msg
            };
          }
        });
        return Response.badRequest(res, { errors: { ...err } });
      }
      return next();
    } catch (error) {
      const payload = {
        message: 'Something went wrong', error
      };
      return Response.internalServerError(res, payload);
    }
  }

  /**
   * @param {object} req Takes signup request
   * @param {object} res Response to request
   * @param {object} next move to the next function or middleware
   * @param {string} email the user email must be a string
   * @return {object} User validation response to user
   */
  static async checkEmailExist(req, res, next) {
    const { email } = req.body;
    try {
      const user = await UserModelQuery.getUserByEmail(email);
      if (user) {
        const payload = {
          message: 'This email has been taken'
        };
        return Response.conflict(res, payload);
      }
      return next();
    } catch (error) {
      // console.log(error);
      const payload = {
        message: 'Something went wrong', error
      };
      return Response.internalServerError(res, payload);
    }
  }
}

export default UserValidation;
