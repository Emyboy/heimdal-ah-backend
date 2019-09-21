import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

import passport from 'passport';
import AuthController from '../controllers/AuthController';

const twitterRouter = express.Router();
dotenv.config();

twitterRouter.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

twitterRouter.get(
  '/twitter/callback',
  passport.authenticate('twitter'),
  AuthController.socialAuth
);

twitterRouter.get(
  '/twitter',
  passport.authenticate('twitter')
);

export default twitterRouter;
