import passport from 'passport';
import dotenv from 'dotenv';
import { Strategy as TwitterStrategy } from 'passport-twitter';

import callbacks from '../../helpers';

const { twitterCallback } = callbacks;

dotenv.config();

const twitterStrategy = () => {
  passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CUSTOMER_KEY,
    consumerSecret: process.env.TWITTER_CUSTOMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL,
    passReqToCallback: true,
    includeEmail: true,
  }, twitterCallback));
};

export default twitterStrategy;
