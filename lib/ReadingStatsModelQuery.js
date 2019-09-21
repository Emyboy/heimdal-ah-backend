import db from '../models';

const { readerStats, profiles, articles } = db;
/**
 * @exports ReadingStatsModelQuery
 * @class ReadingStatsModelQuery
 * @description Handles all Reading Statistics in the application
 * */
class ReadingStatsModelQuery {
/**
   *
   * method to store reading statistics views
   * @static
   * @param {integer} readInfo
   * @returns {json} return json object to user
   * @memberof ReadingStats
   */
  static async createReaderStats(readInfo) {
    const { articleId, userId } = readInfo;
    return readerStats.findOrCreate({
      where: {
        userId,
        articleId
      },
      defaults: { timeRead: new Date() }
    })
    // I use spread to find out if stats was found or created got help from
    // https://stackoverflow.com/questions/43403084/how-to-use-findorcreate-in-sequelize
      .spread(async (result, created) => {
        if (!created) {
          return result.update({ timeRead: new Date() });
        }
        return result;
      });
  }

  /**
   * @description { A function that the details of an article from the database }
   * @param { object } userId
   * @param { object } res
   * @returns { object } getArticle
   */
  static async getUserReadingStats(userId) {
    const user = await readerStats.findAndCountAll({
      where: {
        userId
      },
      include: [
        profiles,
        {
          model: articles,
          as: 'article',
          attributes: ['title', 'slug', 'description', 'createdAt']
        }
      ],
    });
    if (user.count === 0) {
      return null;
    }
    return user;
  }
}
export default ReadingStatsModelQuery;
