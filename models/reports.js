export default (sequelize, DataTypes) => {
  const Reports = sequelize.define('reports', {
    reportType: {
      type: DataTypes.ENUM,
      values: ['spam', 'plagarism', 'others'],
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    articleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    context: {
      type: DataTypes.TEXT,
    }

  }, {});
  // eslint-disable-next-line no-unused-vars
  Reports.associate = (models) => {
    // associations can be defined here
    Reports.belongsTo(models.articles, {
      onDelete: 'CASCADE',
    });
  };
  return Reports;
};
