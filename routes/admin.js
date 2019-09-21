import express from 'express';
import checkAuthentication from '../middlewares/checkAuthentication';
import { checkUserRole, checkUserExist, checkUserId } from '../middlewares/RolesMiddleware';
import RolesController from '../controllers/RolesController';
import { admin } from '../middlewares/authorization';


const router = express.Router();

router.get('/users', checkAuthentication, admin, RolesController.getUsers);
router.get('/users/:userId', checkAuthentication, checkUserId, admin, checkUserExist, RolesController.getAUser);
router.put('/users/:userId', checkAuthentication, checkUserId, admin, checkUserExist, checkUserRole, RolesController.update);

export default router;
