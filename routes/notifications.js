import express from 'express';
import NotificationsController from '../controllers/NotificationsController';
import checkAuthentication from '../middlewares/checkAuthentication';


const router = express.Router();

router.get(
  '/:userId/notifications',
  checkAuthentication,
  NotificationsController.getUsersNotification
);

router.get(
  '/:userId/:notificationId/notifications',
  checkAuthentication,
  NotificationsController.getOneNotification
);

router.put(
  '/:userId/:notificationId/notifications',
  checkAuthentication,
  NotificationsController.updateNotification
);
export default router;
