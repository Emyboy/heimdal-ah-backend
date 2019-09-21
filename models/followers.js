
export default (sequelize, DataTypes) => {
  const followers = sequelize.define('followers', {
    followerId: {
      type: DataTypes.INTEGER
    },
    followingId: {
      type: DataTypes.INTEGER
    }
  }, {});
  // eslint-disable-next-line no-unused-vars
  followers.associate = (models) => {
    followers.belongsTo(models.profiles, {
      foreignKey: 'followingId',
      onDelete: 'CASCADE',
      as: 'follow'
    });
  };
  return followers;
};
