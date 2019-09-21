export default (sequelize, DataTypes) => {
  const bookmarks = sequelize.define('bookmarks', {
    title: DataTypes.STRING
  }, {});
  bookmarks.associate = (models) => {
    // associations can be defined here
    bookmarks.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    bookmarks.belongsTo(models.articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
    });
  };
  return bookmarks;
};
