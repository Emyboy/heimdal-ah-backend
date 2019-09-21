import jwtDecode from 'jwt-decode';
import emailvalidator from 'email-validator';
import Response from '../helpers/StatusResponse';

/** @description generates token for user
 * @param {object} req is the request parameter
 * @param {object} res is the response parameter
 * @param {object} next is the next parameter
 * @return {object} the response object
 * @public
 */
const passwordReset = (req, res, next) => {
  const { token } = req.params;
  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    return res.status(401).json({
      message: 'error decoding token'
    });
  }

  if (!req.body.password) {
    return Response.badRequest(res, { message: 'password is not defined' });
  }
  if (!req.body.confirmPassword) {
    return Response.badRequest(res, { message: 'confirmPassword is not defined' });
  }
  if (req.body.password !== req.body.confirmPassword) {
    return Response.badRequest(res, { message: 'password and comfirmPassword are not the same' });
  }
  req.decoded = decoded;

  return next();
};
/** @description generates token for user
 * @param {object} req is the request parameter
 * @param {object} res is the response parameter
 * @param {object} next is the next parameter
 * @return {object} the response object
 * @public
 */
const validEmail = (req, res, next) => {
  if (!emailvalidator.validate(req.body.email)) {
    return Response.badRequest(res, { message: 'please input a valid email' });
  }
  return next();
};
export { passwordReset, validEmail };
