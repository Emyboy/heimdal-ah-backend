import Model from '../models';
import StatusResponse from '../helpers/StatusResponse';
import { findNotificationById } from '../lib/notifications';

const { notifications } = Model;
/** @description NotificationsController class
 * @return {object} the response object
 * @public
 */
class NotificationsController {
  /** @description function to like an article
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async getUsersNotification(req, res) {
    const { userId } = req.params;
    const user = req.app.locals.user.userId;
    if (user !== parseInt(userId, 10)) {
      return StatusResponse.unauthorized(res, { message: 'access cannot be granted' });
    }
    const findNotifications = await notifications.findAndCountAll({
      where: {
        userId
      }
    });
    if (findNotifications) {
      return StatusResponse.success(res, findNotifications);
    }
    return StatusResponse.notfound(res, { message: 'no notificationa found' });
  }

  /** @description function get one notification
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async getOneNotification(req, res) {
    const { notificationId, userId } = req.params;
    const user = req.app.locals.user.userId;

    if (user !== parseInt(userId, 10)) {
      return StatusResponse.unauthorized(res, { message: 'access cannot be granted' });
    }
    const findNotifications = await notifications.findOne({
      where: {
        id: notificationId
      }
    });
    if (findNotifications) {
      return StatusResponse.success(res, findNotifications);
    }
    return StatusResponse.notfound(res, { message: 'notification was found' });
  }

  /** @description function get one notification
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async updateNotification(req, res) {
    const { notificationId, userId } = req.params;
    const user = req.app.locals.user.userId;
    try {
      if (user !== parseInt(userId, 10)) {
        return StatusResponse.unauthorized(res, { message: 'access cannot be granted' });
      }
      const notification = await findNotificationById(notificationId);
      if (notification) {
        await notification.update({
          isRead: true
        });
        return StatusResponse.success(res, { message: 'notification was updated successfully' });
      }
      return StatusResponse.notfound(res, { message: 'no notification found' });
    } catch (error) {
      return StatusResponse.internalServerError(res, { message: 'server error' });
    }
  }
}

export default NotificationsController;
