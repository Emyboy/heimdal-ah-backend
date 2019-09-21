import passport from 'passport';
import { googleStrategy, facebookStrategy, twitterStrategy } from './strategies';

const passportAuth = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  googleStrategy();
  facebookStrategy();
  twitterStrategy();
};

export default passportAuth;
