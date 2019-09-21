import models from '../models';
import UserModelQuery from '../lib/UserModelQuery';

const { users, roles, profiles } = models;

/**
 * @description Google's Authentication Function
 * @param {object} req Request Object
 * @param  {string} accessToken Google access token
 * @param  {string} refreshToken Google secret token
 * @param  {object} profileInfo Google profile
 * @param  {function} done The done function
 * @returns {object} undefined
 */
const googleCallback = async (req, accessToken, refreshToken, profileInfo, done) => {
  const userObject = {};
  const { id: roleId } = await roles.findOne({ where: { name: 'author' } });

  userObject.email = profileInfo.emails[0].value;
  userObject.emailVerification = true;
  userObject.roleId = roleId;

  const firstName = profileInfo.name.givenName;
  const lastName = profileInfo.name.familyName;

  const profile = {};
  profile.username = profileInfo.displayName.split(' ')[0] + Date.now();
  profile.image = profileInfo.photos[0].value;
  profile.firstName = firstName;
  profile.lastName = lastName;

  userObject.profile = profile;

  const googleUser = await UserModelQuery.getUserByEmail(userObject.email);

  if (googleUser) {
    return done(null, googleUser);
  }

  const newUser = await users.create(
    userObject,
    { include: [{ model: profiles, as: 'profile' }] }
  );

  return done(null, newUser);
};

export default googleCallback;
