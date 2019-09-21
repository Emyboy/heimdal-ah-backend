import UsermodelQuery from '../lib/UserModelQuery';
import mailer from '../helpers/mailer';
import { createNotification } from '../lib/notifications';

/** @description Notifications class
 * @public
 */
class Notifications {
  /** @description function to add a notification
   * @param {object} payload is the response parameter
   * @param {object} io is the response parameter
   * @return {object} the response object
   * @public
   */
  static async addNotification(payload, io) {
    try {
      const {
        to: { userId, title, slug }, type, from: user, event: { createdAt, id }
      } = payload;
      const articleOwner = await UsermodelQuery.getUserById(userId);
      const sender = await UsermodelQuery.getUserById(user);
      const { dataValues: { email } } = articleOwner;
      const { profile: { dataValues: { username } } } = sender;
      const info = {
        title,
        type,
        link: slug,
        userId,
        senderUsername: username,
        senderId: user,
        event: { createdAt, id }
      };
      const created = await createNotification(info);
      if (created) {
        await mailer.sendNotificationMail(email, username, info);
        return io.emit('Notification Created', info);
      }
      return false;
    } catch (error) {
      return error;
    }
  }

  /** @description function to add a follow notification
   * @param {object} payload is the response parameter
   * @param {object} io is the response parameter
   * @return {object} the response object
   * @public
   */
  static async followNotification(payload, io) {
    try {
      const { to: intFollowId, type, from: userId } = payload;
      const followed = await UsermodelQuery.getUserById(intFollowId);
      const follower = await UsermodelQuery.getUserById(userId);
      const { dataValues: { email } } = followed;
      const { profile: { dataValues: { username } } } = follower;
      const info = {
        title: 'followed',
        type,
        userId,
        senderId: intFollowId,
        link: ''
      };
      const created = await createNotification(info);
      if (created) {
        await mailer.sendNotificationMail(email, username, info);
        return io.emit('Notification Created', info);
      }
      return false;
    } catch (error) {
      return error;
    }
  }
}
export default Notifications;
