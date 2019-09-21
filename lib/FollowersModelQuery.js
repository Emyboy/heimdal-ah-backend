import models from '../models';
// import profiles from '../models/profiles';

const { followers, profiles } = models;
/**
 *
 *
 * @class UserLibFile
 */
class FollowersModelQuery {
  /**
    * @param {stirng} followingId username of the person you are following
   * @return {object} return .
   */
  static async findFollowingByUsername(followingId) {
    try {
      const userRecord = await followers.findOne({ where: { followingId } });
      if (userRecord) {
        return userRecord;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
    * @param {stirng} followingId username must be type string
    * @param {stirng} followerId  user id must be type integer
   * @return {object} return an object
   */
  static async findFollowingById(followingId, followerId) {
    try {
      const userRecord = await followers.findOne({ where: { followingId, followerId } });
      if (userRecord) {
        return userRecord;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
    * @param {stirng} followerId  user id must be type integer
   * @return {object} return an object
   */
  static async findAllFollowers(followerId) {
    try {
      const userRecord = await followers.findAll({
        include: [{
          model: profiles,
          as: 'follow'
        }],
        where: { followerId },
      });
      if (userRecord) {
        return userRecord;
      }
      return null;
    } catch (e) {
      // console.log(e);
      throw new Error('Something went wrong', e);
    }
  }

  /**
    * @param {stirng} followingId  user id must be type integer
   * @return {object} return an object
   */
  static async findAllFollowing(followingId) {
    try {
      const userRecord = await followers.findAll({
        include: [{
          model: profiles,
          as: 'follow'
        }],
        where: { followingId }
      });
      if (userRecord) {
        return userRecord;
      }
      return null;
    } catch (e) {
      // console.log(e);
      throw new Error('Something went wrong', e);
    }
  }
}
export default FollowersModelQuery;
