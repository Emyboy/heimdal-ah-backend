import express from 'express';
import PasswordController from '../controllers/PasswordController';
import FollowersController from '../controllers/FollowersController';
import { passwordReset, validEmail } from '../middlewares/passwordReset';
import UsersController from '../controllers/UsersController';
import checkAuthentication from '../middlewares/checkAuthentication';

const router = express.Router();

router.post('/', validEmail, PasswordController.forgotPassword);
router.put('/resetpassword/:token', passwordReset, PasswordController.resetPassword);
router.get('/authors', UsersController.list);

// follow user begins here
router.post('/:followingId/follow', checkAuthentication, FollowersController.followUsers);
router.post('/:followingId/unfollow', checkAuthentication, FollowersController.unfollowUser);
router.get('/followers', checkAuthentication, FollowersController.getAllFollowers);
router.get('/following', checkAuthentication, FollowersController.getAllFollowing);
/**
 * Verify the users email
 */
router.get('/verify-email/:emailToken', UsersController.verifyEmail);

export default router;
