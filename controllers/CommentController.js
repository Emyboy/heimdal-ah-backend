import { Op } from 'sequelize';
import db from '../models';
import StatusResponse from '../helpers/StatusResponse';
import eventEmitter from '../helpers/eventEmitter';
import ArticleQueryModel from '../lib/ArticleQueryModel';
import eventTypes from '../events/eventTypes';
import CommentQueryModel from '../lib/CommentQueryModel';

const { comments } = db;
/**
 * @description CommentController class
 */
class CommentController {
  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request
   * @param {Object} res - HTTP Response
   * @return {Object} Returned object
   */
  static async create(req, res) {
    const { content, isPrivate } = req.body;
    const { articleId } = req.params;
    const { userId } = req.app.locals.user;
    try {
      const comment = await comments.create({
        userId,
        articleId,
        content,
        isPrivate
      });

      const articleOwner = await ArticleQueryModel.getArticleByIdentifier({ id: articleId });

      eventEmitter.emit(eventTypes.COMMENT_NOTIFICATION_EVENT, {
        to: articleOwner.dataValues,
        from: userId,
        articleId: req.params.articleId,
        type: 'comment',
        event: comment.dataValues
      });

      const payload = {
        message: 'Comment has been successfully created',
        comment
      };
      return StatusResponse.created(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully create a Comment',
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
    const { articleId } = req.params;
    const { article } = req.app.locals;
    const { userId } = req.app.locals.user;
    const articleUser = article.userId;
    const commentInfo = {
      userId,
      articleId
    };
    try {
      if (articleUser === userId) {
        const comment = await CommentQueryModel.getPrivateComment(commentInfo);
        if (!comment) {
          const payload = {
            message: 'No Comment exist'
          };
          return StatusResponse.notfound(res, payload);
        }
        const payload = {
          message: 'All Comment for the Article',
          comment
        };
        return StatusResponse.success(res, payload);
      }
      const comment = await CommentQueryModel.getPublicComment(commentInfo);
      if (!comment) {
        const payload = {
          message: 'No Comment exist'
        };
        return StatusResponse.notfound(res, payload);
      }
      const payload = {
        message: 'All Comment for the Article',
        comment
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully list out Comments',
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
    const { commentId } = req.params;
    try {
      await comments.update({
        isArchived: true,
      }, {
        where: {
          [Op.or]: [{ id: commentId }, { commentId }]
        }
      });
      const payload = {
        message: 'Successfully deleted'
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      const payload = {
        message: 'Cannot succesfully delete a Comment',
        error: {
          body: [`Internal server error => ${error}`]
        }
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }
}

export default CommentController;
