import express from 'express';
import PasswordController from '../controllers/PasswordController';
import { passwordReset, validEmail } from '../middlewares/passwordReset';

const router = express.Router();

router.post('/forgot', validEmail, PasswordController.forgotPassword);
router.put('/reset/:token', passwordReset, PasswordController.resetPassword);

export default router;
