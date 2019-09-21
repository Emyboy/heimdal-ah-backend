/* eslint-disable no-unused-vars */
import bcrypt from 'bcryptjs';

const genSalt = bcrypt.genSaltSync(8);
const hashPassword = bcrypt.hashSync('12345678heimdal', genSalt);
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    email: 'admin@heimdal.com',
    password: hashPassword,
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 1,
  }
  ], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
