module.exports = (sequelize, DataTypes) => {
  const ArticleTag = sequelize.define(
    'ArticleTag',
    {
      articleId: DataTypes.INTEGER,
      tagId: DataTypes.INTEGER
    },
    {}
  );
  ArticleTag.associate = (models) => {
    // associations can be defined here
    ArticleTag.belongsTo(models.articles, {
      foreignKey: 'articleId'
    });
    ArticleTag.belongsTo(models.tags, {
      foreignKey: 'tagId'
    });
  };
  return ArticleTag;
};
