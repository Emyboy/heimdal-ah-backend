import StatusResponse from '../helpers/StatusResponse';
import ReplyQueryModel from '../lib/ReplyQueryModel';
/**
 * Validate all Reply fields
 *classname should match file name and start with capital
 * @class ReplyValidation
 */
class ReplyValidation {
  /**
   * @param {object} req Takes Reply request
   * @param {object} res Response to request
   * @param {object} next Move to the next function
   * @return {object} Reply validation response to user
   */
  static checkReplyContent(req, res, next) {
    req.checkBody('content', 'Please enter the reply content').notEmpty();
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
   * @param {object} req Takes Reply request
   * @param {object} res Response to request
   * @param {object} next Move to the next function
   * @return {object} User validation response to user
   */
  static checkReplyId(req, res, next) {
    req.checkParams('replyId', 'Reply Id must be an Integer').isInt();
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
   * @param {object} req Takes Reply request
   * @param {object} res Response to request
   * @param {object} next Move to the next function
   * @return {object} Comment validation response to user
   */
  static checkCommentId(req, res, next) {
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
   * @return {object} Reply validation response to user
   */
  static async checkReplyExist(req, res, next) {
    const { replyId } = req.params;
    const reply = await ReplyQueryModel.getReplyById(replyId);
    if (!reply) {
      return StatusResponse.notfound(res, {
        message: 'Could not find reply'
      });
    }
    return next();
  }
}

export default ReplyValidation;
