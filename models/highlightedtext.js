export default (sequelize, DataTypes) => {
  const HighlightedText = sequelize.define(
    'HighlightedText',
    {
      highlightId: DataTypes.STRING,
      startIndex: DataTypes.INTEGER,
      stopIndex: DataTypes.INTEGER,
      text: DataTypes.STRING,
      comment: DataTypes.STRING,
      stillExist: { type: DataTypes.BOOLEAN, defaultValue: true }
    },
    {}
  );
  HighlightedText.associate = (models) => {
    // associations can be defined here
    HighlightedText.belongsTo(models.articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE'
    });

    HighlightedText.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return HighlightedText;
};
