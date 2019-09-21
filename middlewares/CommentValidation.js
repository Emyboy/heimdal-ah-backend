import StatusResponse from '../helpers/StatusResponse';
import ArticleQueryModel from '../lib/ArticleQueryModel';
/**
 * Validate all comment fields
 *classname should match file name and start with capital
 * @class CommentValidation
 */
class CommentValidation {
  /**
   * @param {object} req Takes comment request
   * @param {object} res Response to request
   * @param {object} next Move to the next function
   * @return {object} Comment validation response to user
   */
  static checkCommentContent(req, res, next) {
    req.checkBody('content', 'Please enter the comment content').notEmpty();
    req.checkBody('content', 'Content Length cannot be more than 1500 characters').isLength({ max: 1500 });
    const errors = req.validationErrors();
    const err = [];
    if (errors) {
      errors.forEach(({ param, msg }) => {
        if (!err[param]) {
          err[param] = {
            msg
          };
        }
      });
      return StatusResponse.badRequest(res, { errors: { ...err } });
    }
    return next();
  }

  /**
   * @param {object} req Takes comment request
   * @param {object} res Response to request
   * @param {object} next Move to the next function
   * @return {object} User validation response to user
   */
  static checkCommentId(req, res, next) {
    req.checkParams('articleId', 'Article Id must be an Integer').isInt();
    req.checkParams('commentId', 'Comment Id must be an Integer').isInt();
    const errors = req.validationErrors();
    const err = [];
    if (errors) {
      errors.forEach(({ param, msg }) => {
        if (!err[param]) {
          err[param] = {
            msg
          };
        }
      });
      return StatusResponse.badRequest(res, { errors: { ...err } });
    }
    return next();
  }

  /**
   * @param {object} req Takes comment request
   * @param {object} res Response to request
   * @param {object} next Move to the next function
   * @return {object} User validation response to user
   */
  static checkArticleId(req, res, next) {
    req.checkParams('articleId', 'Article Id must be an Integer').isInt();
    const errors = req.validationErrors();
    const err = [];

    if (errors) {
      errors.forEach(({ param, msg }) => {
        if (!err[param]) {
          err[param] = {
            msg
          };
        }
      });
      return StatusResponse.badRequest(res, { errors: { ...err } });
    }
    return next();
  }

  /**
   * @param {object} req Takes comment request
   * @param {object} res Response to request
   * @param {object} next Move to the next function
   * @return {object} User validation response to user
   */
  static async checkCommentParams(req, res, next) {
    const { commentId } = req.params;

    try {
      const checkComment = await ArticleQueryModel.getCommentById(commentId);
      if (!checkComment) {
        const payload = {
          message: 'No Comment exist'
        };
        return StatusResponse.notfound(res, payload);
      }
      return next();
    } catch (error) {
      const payload = {
        message: 'Cannot Query the Comment Database',
        error: {
          body: [`Internal server error => ${error}`]
        }
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }
}

export default CommentValidation;
