import models from '../models';
import UserModelQuery from '../lib/UserModelQuery';

const { users, roles, profiles } = models;

/**
 * @description Twitter's Authentication Function
 * @param {object} req Request Object
 * @param  {string} token Twitter token
 * @param  {string} tokenSecret Twitter secret token
 * @param  {object} profileInfo Twitter profile
 * @param  {function} done The done function
 * @returns {object} undefined
 */
const twitterCallback = async (req, token, tokenSecret, profileInfo, done) => {
  const userObject = {};
  const { id: roleId } = await roles.findOne({ where: { name: 'author' } });

  userObject.email = profileInfo.emails[0].value;
  userObject.emailVerification = true;
  userObject.roleId = roleId;

  const profile = {};
  profile.image = profileInfo.photos[0].value;
  profile.username = profileInfo.displayName.split(' ')[0] + Date.now();

  userObject.profile = profile;

  const twitterUser = await UserModelQuery.getUserByEmail(userObject.email);

  if (twitterUser) {
    return done(null, twitterUser);
  }

  const newUser = await users.create(
    userObject,
    { include: [{ model: profiles, as: 'profile' }] }
  );

  return done(null, newUser);
};

export default twitterCallback;
