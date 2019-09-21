import { like, numOflikers } from '../helpers/likes';
import StatusResponse from '../helpers/StatusResponse';
import ArticleQueryModel from '../lib/ArticleQueryModel';


/** @description usersController class
 * @return {object} the response object
 * @public
 */
class LikesController {
  /** @description function to like an article
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async likesArticles(req, res) {
    const { articleId } = req.params;
    const { userId } = req.app.locals.user;
    try {
      const articleOwner = await ArticleQueryModel.getArticleByIdentifier({ id: articleId });
      const payload = {
        articleOwner,
        articleId,
        userId,
        commentId: null
      };
      await like(res, payload);
    } catch (error) {
      StatusResponse.internalServerError(res, { message: 'server error' });
    }
  }

  /** @description function to like a comment
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async likesComments(req, res) {
    const { commentId, articleId } = req.params;
    const { userId } = req.app.locals.user;
    const articleOwner = await ArticleQueryModel.getArticleByIdentifier({ id: articleId });
    const payload = {
      articleId: null,
      userId,
      commentId,
      articleOwner
    };

    try {
      const ifExist = await ArticleQueryModel.getCommentById(commentId);
      if (!ifExist) {
        return StatusResponse.notfound(res, { message: 'comment was not found' });
      }
      await like(res, payload);
      return StatusResponse.success(res, { message: 'comment was liked successfully' });
    } catch (error) {
      return StatusResponse.internalServerError(res, { message: 'server errorrrr' });
    }
  }

  /** @description get all likes
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async getAriticles(req, res) {
    const { articleId } = req.params;
    const payload = {
      articleId,
      commentId: null
    };
    try {
      const likes = await numOflikers(res, payload);
      return likes;
    } catch (error) {
      return StatusResponse.internalServerError(res, { message: 'server error' });
    }
  }

  /** @description get all comments
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async likedComments(req, res) {
    const { commentId } = req.params;
    const payload = {
      commentId,
      articleId: null
    };
    try {
      const ifExist = await ArticleQueryModel.getCommentById(commentId);
      if (!ifExist) {
        return StatusResponse.notfound(res, { message: 'comment was not found' });
      }
      const likes = await numOflikers(res, payload);
      return likes;
    } catch (error) {
      return StatusResponse.internalServerError(res, { message: 'server error' });
    }
  }
}
export default LikesController;
