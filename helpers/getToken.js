import jwt from 'jsonwebtoken';

const getToken = (userId, username, roleId) => jwt.sign(
  {
    userId,
    username,
    roleId
  },
  process.env.TOKEN_SECRET,
  {
    expiresIn: 86400
  }
);

export default getToken;
