import models from '../models';

const { users, profiles } = models;
/**
 *
 *
 * @class UserModelQuery
 */
class UserModelQuery {
  /**
   * @param {stirng} email email must be type string
   * @return {object} return user if it exist or null if it doesn't.
   */
  static async getUserByEmail(email) {
    try {
      const emailUser = await users.findOne({
        where: { email },
        include: { model: profiles, as: 'profile' }
      });
      if (emailUser) {
        return emailUser;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
   * @param {stirng} id id must be type interger
   * @return {object} return user if it exist or null if it doesn't.
   */
  static async getUserById(id) {
    try {
      const user = await users.findOne({
        where: { id },
        include: { model: profiles, as: 'profile' }
      });
      if (user) {
        return user;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }
}
export default UserModelQuery;
