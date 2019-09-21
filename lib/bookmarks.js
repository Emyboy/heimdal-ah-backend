import Model from '../models';

const { bookmarks } = Model;

/** @description validate bookmarks
   * @param {integer} userId is the request parameter
   * @param {integer} articleId is the response parameter
   * @return {object} the response object
   * @public
   */
const validateBookmarks = async (userId, articleId) => {
  try {
    const isAvalaible = await bookmarks.findOne({
      where: {
        userId,
        articleId
      }
    });
    if (!isAvalaible) {
      return true;
    }
    return false;
  } catch (error) {
    return error;
  }
};

export default validateBookmarks;
