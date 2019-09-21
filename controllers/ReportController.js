import model from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { reports } = model;
/**
 * @description Reports an article
 */
class ReportController {
  /**
     * @description
     * @param {object} req make a request to the report route
     * @param {object} res get response from the report route
     * @returns {object} returns an object
     */
  static async create(req, res) {
    const { reportType, context } = req.body;
    const reportTypeToLowerCase = reportType.toLowerCase();
    const userData = req.app.locals.user;
    const articleData = req.app.locals.article.dataValues;
    const { userId } = userData;
    const { id } = articleData;
    try {
      await reports.create({
        userId,
        articleId: id,
        context,
        reportType: reportTypeToLowerCase
      });
      return StatusResponse.created(res, {
        message: 'You have succesfully reported an article'
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: 'Article not reported succesfully, please try again',
        error: {
          body: [`Internal server error => ${error}`]
        }
      });
    }
  }
}

export default ReportController;
