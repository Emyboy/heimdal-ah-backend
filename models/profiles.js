export default (sequelize, DataTypes) => {
  const Profiles = sequelize.define('profiles', {

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    biodata: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    twitterUsername: {
      type: DataTypes.STRING
    },
    facebookUsername: {
      type: DataTypes.STRING
    },
  }, {});
  Profiles.associate = (models) => {
    // associations can be defined here
    Profiles.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Profiles.hasMany(models.comments, {
      foreignKey: 'userId',
      as: 'profile'
    });
    Profiles.hasMany(models.replies, {
      foreignKey: 'userId',
      as: 'profiles'
    });
    Profiles.hasMany(models.followers, {
      foreignKey: 'followingId',
    });
  };
  return Profiles;
};
