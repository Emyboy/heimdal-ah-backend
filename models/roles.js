
export default (sequelize, DataTypes) => {
  const Roles = sequelize.define('roles', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
    }
  }, {});
  Roles.associate = (models) => {
    // associations can be defined here
    Roles.hasMany(models.users, {

    });
  };
  return Roles;
};
