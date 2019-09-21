import passport from 'passport';
import dotenv from 'dotenv';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

import callbacks from '../../helpers';

const { googleCallback } = callbacks;

dotenv.config();

const googleStrategy = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    profileFields: ['id', 'emails', 'displayName', 'picture.type(large)'],
  }, googleCallback));
};

export default googleStrategy;
