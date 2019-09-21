import express from 'express';

import passport from 'passport';
import AuthController from '../controllers/AuthController';
import UserValidation from '../middlewares/UserValidation';

const { validateUserLogin, validateUserSignUp, checkEmailExist } = UserValidation;
const router = express.Router();

router.post('/signup', validateUserSignUp, checkEmailExist, AuthController.signUp);
router.post('/login', validateUserLogin, AuthController.login);

router.get('/google/callback', passport.authenticate('google'), AuthController.socialAuth);

router.get(
  '/google',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ]
  })
);

router.get(
  '/facebook',
  passport.authenticate('facebook', {
    scope: ['email']
  })
);

router.get('/facebook/callback', passport.authenticate('facebook'), AuthController.socialAuth);

export default router;
