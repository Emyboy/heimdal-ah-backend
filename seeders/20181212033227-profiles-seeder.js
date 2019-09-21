/* eslint-disable no-unused-vars */

export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('profiles', [{
    username: 'segun',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 2,
  },
  {
    username: 'john',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 3,
  },
  {
    username: 'james',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 4,
  },
  {
    username: 'joe',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 5,
  },
  {
    username: 'user1',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 6,
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('profiles', null, {})
};
