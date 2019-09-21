export default (sequelize, DataTypes) => {
  const Ratings = sequelize.define('ratings', {
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
      }
    },
  }, {});
  Ratings.associate = (models) => {
    Ratings.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Ratings.belongsTo(models.articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
    });
  };
  return Ratings;
};
