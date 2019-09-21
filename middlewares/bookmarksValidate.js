import validateBookmarks from '../lib/bookmarks';
import StatusResponse from '../helpers/StatusResponse';

const bookmarksValidate = async (req, res, next) => {
  const { articleId } = req.params;
  const { userId } = req.app.locals.user;
  if (!userId) {
    return StatusResponse.badRequest(res, { message: 'Please User is not logged in' });
  }

  const result = await validateBookmarks(userId, articleId);
  if (result !== true) {
    return StatusResponse.badRequest(res, { message: 'Please Article cannot be bookmarked' });
  }
  return next();
};

export default bookmarksValidate;
