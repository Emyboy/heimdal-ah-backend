import StatusResponse from './StatusResponse';
import myEmitter from './eventEmitter';
import eventTypes from '../events/eventTypes';
import {
  findLikes,
  deleteLikes,
  createLikes,
  listOfLikers
} from '../lib/likes';
/** @description function to like an article and comments
   * @param {string} res is the request parameter
   * @param {string} payload is the response parameter
   *  @param {string} userId is the response parameter
   * @return {object} the response object
   * @public
   */
const like = async (res, payload) => {
  const { articleOwner, articleId, userId } = payload;
  try {
    const ifExist = await findLikes(payload);
    // if like already exist
    if (ifExist) {
      await deleteLikes(payload);
      return StatusResponse.success(res, { message: 'Unlike was succesful' });
    }
    //  if like does not exist create new like
    const likes = await createLikes(payload);
    myEmitter.emit(eventTypes.ARTICLE_NOTIFICATION_EVENT, {
      to: articleOwner.dataValues,
      from: userId,
      articleId,
      type: 'like',
      event: likes.dataValues
    });

    return StatusResponse.success(res, { message: 'like was successful' });
  } catch (error) {
    return StatusResponse.internalServerError(error);
  }
};

/** @description number of likes for comment and articles
   * @param {string} res is the request parameter
   * @param {string} payload is the response parameter
   * @return {object} the response object
   * @public
   */
const numOflikers = async (res, payload) => {
  try {
    const numOfLikes = await listOfLikers(payload);
    return StatusResponse.success(res, numOfLikes);
  } catch (error) {
    return StatusResponse.internalServerError(res, { message: 'server error' });
  }
};

export {
  like,
  numOflikers
};
