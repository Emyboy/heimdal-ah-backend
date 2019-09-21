
export default (sequelize) => {
  const likes = sequelize.define('likes', {
  }, {});
  likes.associate = (models) => {
    likes.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    likes.belongsTo(models.articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
    });
    likes.belongsTo(models.comments, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
    });
  };
  return likes;
};
