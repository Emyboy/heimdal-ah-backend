import Models from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { bookmarks, articles } = Models;
/** @description usersController class
 * @return {object} the response object
 * @public
 */
class BookmarksController {
  /** @description create a bookmark
   * @param {string} req is the request parameter
   * @param {string} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async create(req, res) {
    const { user: { userId }, article: { title } } = req.app.locals;
    const { articleId } = req.params;

    try {
      const bookmark = await bookmarks.create({
        title: req.body.title || title,
        userId,
        articleId
      });

      if (!bookmark) {
        return StatusResponse.badRequest(res, { message: 'error posting bookmark' });
      }

      return StatusResponse.success(res, { message: 'hurray! bookmark was added successfully' });
    } catch (error) {
      return StatusResponse.internalServerError(error);
    }
  }

  /** @description get one bookmark
   * @param {object} req is the request parameter
   * @param {object} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async search(req, res) {
    const { q } = req.query;
    const { userId } = req.app.locals.user;
    const searchTokens = q.split(' ').map(term => `%${term}%`);

    try {
      const bookmark = await bookmarks.findAndCountAll({
        where: {
          title: { $iLike: { $any: searchTokens } },
          userId,
        },
        attributes: { include: ['createdAt', 'title'] },
        include: [{
          model: articles,
          as: 'article',
          attributes: ['title', 'id', 'slug']
        }]
      });
      if (!bookmark) {
        return StatusResponse.notfound(res, { message: 'no bookmark found' });
      }
      return StatusResponse.success(res, bookmark);
    } catch (error) {
      return StatusResponse.internalServerError(res, { meassge: 'Server error' });
    }
  }

  /** @description get all bookmarks
   * @param {object} req is the request parameter
   * @param {object} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async getAll(req, res) {
    const { userId } = req.app.locals.user;

    try {
      const bookmark = await bookmarks.findAndCountAll({
        where: {
          userId
        },
        attributes: ['createdAt', 'title', 'userId'],
        include: [{
          model: articles,
          as: 'article',
          attributes: ['title', 'id', 'slug']
        }]
      });
      if (!bookmark) {
        return StatusResponse.notfound(res, { message: 'no bookmark found' });
      }
      return StatusResponse.success(res, bookmark);
    } catch (error) {
      return StatusResponse.internalServerError(res, { message: 'server error' });
    }
  }

  /** @description Delete a bookmark
   * @param {object} req is the request parameter
   * @param {object} res is the response parameter
   * @return {object} the response object
   * @public
   */
  static async delete(req, res) {
    const { user: { userId } } = req.app.locals;
    const { bookmarkId } = req.params;
    try {
      const bookmark = await bookmarks.destroy({
        where: {
          id: bookmarkId,
          userId
        }
      });
      if (!bookmark) {
        return StatusResponse.notfound(res, { message: 'bookmark was not found' });
      }
      return StatusResponse.success(res, { message: 'bookmark was deleted successfully' });
    } catch (error) {
      return StatusResponse.internalServerError(res, { message: 'server error' });
    }
  }
}
export default BookmarksController;
