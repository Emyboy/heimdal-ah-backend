import models from '../models';

const { profiles } = models;
/**
 *
 *
 * @class UserLibFilex
 */
class ProfilesModelQuery {
  /**
    * @param {stirng} userId email must be type string
   * @return {object} return email if it exist or null if it doesn't.
   */
  static async getUserById(userId) {
    try {
      const userRecord = await profiles.findOne({ where: { userId } });
      if (userRecord) {
        return userRecord;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }
}
export default ProfilesModelQuery;
