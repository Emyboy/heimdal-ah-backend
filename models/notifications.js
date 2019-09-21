export default (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    senderId: DataTypes.INTEGER,
    message: DataTypes.STRING,
    type: DataTypes.STRING,
    isRead: DataTypes.BOOLEAN
  }, {});
  notifications.associate = (models) => {
    // associations can be defined here
    notifications.belongsTo(models.users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return notifications;
};
