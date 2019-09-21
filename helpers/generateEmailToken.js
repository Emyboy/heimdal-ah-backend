import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
   * Gnerate Email Token
   * @param {string} email
   * @returns {string} token
   */
const generateEmailToken = (email) => {
  const token = jwt.sign(
    {
      email
    },
    process.env.EMAIL_SECRET
  );
  return token;
};

export default generateEmailToken;
