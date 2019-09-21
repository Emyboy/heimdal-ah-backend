import { Op } from 'sequelize';
import models from '../models';

const { comments, profiles } = models;
/**
 *
 *
 * @class CommentQueryModel
 */
class CommentQueryModel {
  /**
    * @param {object} commentInfo  must be type integer
   * @return {object} return an comment if it exist or null if it doesn't.
   */
  static async getPrivateComment(commentInfo) {
    const { articleId } = commentInfo;
    try {
      const comment = await comments.findAll({
        include: [
          {
            model: profiles,
            as: 'profile',
            attributes: ['username', 'image']
          }
        ],
        where: {
          articleId,
          isArchived: false,
          commentId: null,
        }
      });
      if (comment.length === 0) {
        return null;
      }
      return comment;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
    * @param {object} commentInfo  must be an object of data
   * @return {object} return an comment if it exist or null if it doesn't.
   */
  static async getPublicComment(commentInfo) {
    const { articleId, userId } = commentInfo;
    try {
      const comment = await comments.findAll({
        include: [
          {
            model: profiles,
            as: 'profile',
            attributes: ['username', 'image']
          }
        ],
        where: {
          [Op.or]: [
            {
              articleId,
              isArchived: false,
              commentId: null,
              isPrivate: false
            }, { userId, isPrivate: true, articleId }],
        }
      });
      if (comment.length === 0) {
        return null;
      }
      return comment;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }
}
export default CommentQueryModel;
