import Models from '../models';

const { notifications } = Models;
// find one by notification by ID
const findNotificationById = async (notificationId) => {
  const notification = await notifications.findOne({
    where: {
      id: notificationId
    }
  });
  return notification;
};
// find one notification by userId and senderId
const findNotification = async (userId, senderId) => {
  const notification = await notifications.findOne({
    where: {
      userId,
      senderId
    }
  });
  return notification;
};
// delete one notification
const updateNotifications = async (senderId, userId) => {
  await notifications.update({
    where: {
      senderId,
      userId
    }
  });
};

// create a notification
const createNotification = async (info) => {
  const { userId, type, senderId } = info;
  try {
    const ifExist = await findNotification(userId, senderId);

    if (ifExist && type === 'like') {
      await updateNotifications(senderId, userId);
      return false;
    }
    //  if like does not exist create new like
    await notifications.create({
      userId,
      type,
      senderId
    });
    return true;
  } catch (error) {
    return error;
  }
};

export {
  createNotification,
  updateNotifications,
  findNotification,
  findNotificationById
};
