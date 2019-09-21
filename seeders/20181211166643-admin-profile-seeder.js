/* eslint-disable no-unused-vars */
export default {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('profiles', [{
    username: 'wale',
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: 1,
  }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('profiles', null, {})
};
