export default (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    'tags',
    {
      tagName: DataTypes.STRING
    },
    {}
  );
  Tag.associate = (models) => {
    // associations can be defined here
    Tag.belongsToMany(models.articles, {
      through: 'ArticleTag',
      as: 'tags',
      foreignKey: 'tagId'
    });
  };
  return Tag;
};
