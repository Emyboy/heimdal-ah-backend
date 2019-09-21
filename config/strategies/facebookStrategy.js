import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import dotenv from 'dotenv';

import callbacks from '../../helpers';

const { facebookCallback } = callbacks;

dotenv.config();

const facebookStrategy = () => {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'emails', 'displayName', 'picture.type(large)'],
    passReqToCallback: true
  }, facebookCallback));
};

export default facebookStrategy;
