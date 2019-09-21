export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('HighlightedTexts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    highlightId: {
      type: Sequelize.STRING
    },
    startIndex: {
      type: Sequelize.INTEGER
    },
    stopIndex: {
      type: Sequelize.INTEGER
    },
    text: {
      type: Sequelize.STRING
    },
    comment: {
      type: Sequelize.STRING
    },
    stillExist: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    articleId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'articles',
        key: 'id',
        as: 'articleId'
      },
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'users',
        key: 'id',
        as: 'userId'
      },
      allowNull: false
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
  down: queryInterface => queryInterface.dropTable('HighlightedTexts')
};
