import StatusResponse from '../helpers/StatusResponse';
import ReplyQueryModel from '../lib/ReplyQueryModel';
import eventEmitter from '../helpers/eventEmitter';
import eventTypes from '../events/eventTypes';
import ArticleQueryModel from '../lib/ArticleQueryModel';


/**
 * @description RepliesController class
 */
class RepliesController {
  /**
   * @description CRUD on replies
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async create(req, res) {
    const { content } = req.body;
    const { commentId } = req.params;
    const { userId } = req.app.locals.user;
    try {
      const info = {
        content,
        commentId,
        userId
      };
      const replies = await ReplyQueryModel.createReplies(info);

      const commentOwner = await ArticleQueryModel.getArticleByIdentifier({ id: commentId });

      eventEmitter.emit(eventTypes.COMMENT_NOTIFICATION_EVENT, {
        to: commentOwner.dataValues,
        from: userId,
        articleId: req.params.commentId,
        type: 'comment',
        event: replies.dataValues
      });
      const payload = {
        message: 'Reply has been successfully created',
        replies
      };
      return StatusResponse.created(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot create a reply',
        error: {
          body: [`Internal server error => ${error}`]
        }
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }

  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async list(req, res) {
    const { commentId } = req.params;
    try {
      const commentReplies = await ReplyQueryModel.listCommentReplies(commentId);
      if (commentReplies.length === 0) {
        const payload = {
          message: 'No reply exist for this comment'
        };
        return StatusResponse.notfound(res, payload);
      }
      const payload = {
        message: 'All replies for the comment',
        commentReplies
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot list out Comments',
        error: {
          body: [`Internal server error => ${error.message}`]
        }
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }

  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async update(req, res) {
    const { commentId, replyId } = req.params;
    const { content } = req.body;
    const { userId } = req.app.locals.user;
    const updateData = {
      commentId,
      replyId,
      content,
      userId
    };
    try {
      const result = await ReplyQueryModel.updateReply(updateData);

      if (result[0] === 0) {
        const payload = {
          message: 'Cannot update the reply'
        };
        return StatusResponse.notfound(res, payload);
      }
      const payload = {
        message: 'Succesfully updated the reply'
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot update the reply',
        error: {
          body: [`Internal server error => ${error.message}`]
        }
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }

  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async archive(req, res) {
    const { replyId } = req.params;
    try {
      await ReplyQueryModel.archiveReply(replyId);
      const payload = {
        message: 'Successfully deleted'
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot delete the reply',
        error: {
          body: [`Internal server error => ${error}`]
        }
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }
}

export default RepliesController;
