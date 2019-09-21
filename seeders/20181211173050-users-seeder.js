/* eslint-disable no-unused-vars */
import bcrypt from 'bcryptjs';

const genSalt = bcrypt.genSaltSync(8);
const hashPassword = bcrypt.hashSync('12345678heimdal', genSalt);
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('users', [{
    email: 'user@heimdal.com',
    password: hashPassword,
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  },
  {
    email: 'author@heimdal.com',
    password: hashPassword,
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  },
  {
    email: 'publisher@heimdal.com',
    password: hashPassword,
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 3,
  },
  {
    email: 'publisherb@heimdal.com',
    password: hashPassword,
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  },
  {
    email: 'usertest@heimdal.com',
    password: '$2y$08$pAT7OB/WXBR2bHlnIWsNieFTOHCxuSL73sCHJdvUNe7s7uCAcavy2',
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  },
  {
    email: 'usertest@heimdal.com',
    password: '$2y$08$pAT7OB/WXBR2bHlnIWsNieFTOHCxuSL73sCHJdvUNe7s7uCAcavy2',
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  },
  {
    email: 'usertest@heimdal.com',
    password: 'omotayo123',
    emailVerification: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    roleId: 2,
  }
  ], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('users', null, {})
};
