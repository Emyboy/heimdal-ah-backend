import jwtDecode from 'jwt-decode';
import StatusResponse from '../helpers/StatusResponse';

const tokenDecoded = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['access-token'];
  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    return res.status(401).json({
      message: 'error decoding token'
    });
  }
  if (!decoded) {
    return StatusResponse.forbidden(res, { message: 'Please user is not avalaible' });
  }

  req.decoded = decoded;
  res.locals.user = {
    userId: req.decoded.userId,
    username: req.decoded.username
  };

  return next();
};

export default tokenDecoded;
