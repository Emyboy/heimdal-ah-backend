export default (sequelize, DataTypes) => {
  const Articles = sequelize.define(
    'articles',
    {
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      isPublished: {
        type: DataTypes.STRING,
        defaultValue: false
      },
      readingTime: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  Articles.associate = (models) => {
    Articles.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
    Articles.hasMany(models.bookmarks, {
      foreignKey: 'articleId',
      as: 'bookmarks'
    });
    Articles.hasMany(models.HighlightedText, {
      foreignKey: 'articleId',
      as: 'highlightedPortions'
    });
    Articles.hasMany(models.likes, {});
    Articles.belongsToMany(models.tags, {
      through: 'ArticleTag',
      as: 'tags',
      foreignKey: 'articleId'
    });
    Articles.belongsToMany(models.profiles, {
      as: 'Readers',
      foreignKey: 'articleId',
      through: 'ReadingStat',
    });
    // Articles.hasMany(models.report, {
    //   foreignKey: 'articleId',
    //   as: 'report',
    // });
  };
  return Articles;
};
