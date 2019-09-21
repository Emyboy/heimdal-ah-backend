import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import StatusResponse from '../helpers/StatusResponse';
import UserModelQuery from '../lib/UserModelQuery';

dotenv.config();
const checkRoleAuthentication = async (req, res, next) => {
  const token = req.headers['access-token'];

  if (!token) {
    req.app.locals.user = {
      userId: undefined,
      username: undefined,
      roleId: undefined
    };
    return next();
  }
  return jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return StatusResponse.unauthorized(res, {
        errors: {
          body: ['User token not authenticated, wrong token']
        }
      });
    }

    const user = await UserModelQuery.getUserById(decoded.userId);
    if (!user) {
      return StatusResponse.unauthorized(res, { message: 'user does not exist' });
    }

    req.app.locals.user = {
      userId: decoded.userId,
      username: decoded.username,
      roleId: decoded.roleId
    };
    return next();
  });
};

export default checkRoleAuthentication;
