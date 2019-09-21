import StatusResponse from '../helpers/StatusResponse';
import ReadingStatsModelQuery from '../lib/ReadingStatsModelQuery';

const { getUserReadingStats } = ReadingStatsModelQuery;

/**
 * @class { ReadingStatsController }
 * @description { Handles Reading stats GET Requests }
 */
class ReadingStatsController {
  /**
   * @description { Get all articles read by a specific user }
   * @param { object } req
   * @param { object } res
   *@return { object } statistics
   */
  static async getReadingStatistics(req, res) {
    const { userId } = req.app.locals.user;
    try {
      const userStats = await getUserReadingStats(userId);
      if (!userStats) {
        const payload = {
          message: 'Statistics not found for this user',
        };
        return StatusResponse.notfound(res, payload);
      }
      const { username } = userStats.rows[0].profile;
      const articles = userStats.rows.map(stat => stat.article);
      const payload = {
        username,
        message: 'Number of articles read:',
        readerStat: userStats.count,
        articles
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully list out reader stats',
        error: {
          body: [`Internal server error => ${error}`]
        }
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }
}

export default ReadingStatsController;
