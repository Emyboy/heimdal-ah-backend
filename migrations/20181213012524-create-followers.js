export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('followers', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    followerId: {
      type: Sequelize.INTEGER
    },
    followingId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'profiles',
        key: 'userId'
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('followers')
};
