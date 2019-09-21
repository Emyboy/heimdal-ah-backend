export default (sequelize, DataTypes) => {
  const Comments = sequelize.define('comments', {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    isArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  Comments.associate = (models) => {
    // associations can be defined here
    Comments.belongsTo(models.articles, {
      foreignKey: 'articleId',
      onDelete: 'CASCADE',
    });
    Comments.belongsTo(models.profiles, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Comments.hasMany(models.likes, {});
    Comments.belongsTo(models.comments, {
      foreignKey: 'commentId',
      onDelete: 'CASCADE',
    });
    Comments.hasMany(models.comments, {
      foreignKey: 'commentId',
      as: 'comments'
    });
  };
  return Comments;
};
