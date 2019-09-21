export default (sequelize, DataTypes) => {
  const ReaderStats = sequelize.define('readerStats', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timeVisited: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {});
  ReaderStats.associate = (models) => {
    // associations can be defined here
    ReaderStats.belongsTo(models.profiles, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    ReaderStats.belongsTo(models.articles, {
      foreignKey: 'articleId'
    });
  };
  return ReaderStats;
};
