import models from '../models';

const { replies, profiles, comments } = models;
/**
 *
 *
 * @class ReplyQueryModel
 */
class ReplyQueryModel {
  /**
    * @param {integer} replyId  must be type integer
   * @return {object} return an reply if it exist or null if it doesn't.
   */
  static async getReplyById(replyId) {
    try {
      const reply = await replies.findOne({
        where: {
          id: replyId,
          isArchived: false
        }
      });
      if (reply) {
        return reply;
      }
      return null;
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
  *
  * method to create replies
  * @static
  * @param {object} info
  * @returns {json} return json object to user
  * @memberof ReadingStats
  */
  static async createReplies(info) {
    try {
      return await replies.create(info);
    } catch (e) {
      throw new Error('Something went wrong', e.message);
    }
  }

  /**
  *
  * method to list out replies
  * @static
  * @param {integer} commentId
  * @returns {json} return json object to user
  * @memberof ReadingStats
  */
  static async listCommentReplies(commentId) {
    try {
      return await replies.findAll({
        where: {
          commentId,
          isArchived: false
        },
        include: [
          {
            model: profiles,
            as: 'profile',
            attributes: ['username', 'image']
          },
          {
            model: comments,
            as: 'comment',
            attributes: ['content']
          }
        ],
      });
    } catch (e) {
      throw new Error('Something went wrong', e.message);
    }
  }

  /**
  *
  * method to update replies
  * @static
  * @param {object} updateData this are data needed to update a reply
  * @returns {json} return json object to user
  * @memberof ReadingStats
  */
  static async updateReply(updateData) {
    const {
      content,
      userId,
      commentId,
      replyId
    } = updateData;
    try {
      return await replies.update({ content }, {
        where: {
          userId,
          commentId,
          id: replyId
        },
      });
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }

  /**
  *
  * method to archive replies
  * @static
  * @param {integer} replyId
  * @returns {json} return json object to user
  * @memberof ReadingStats
  */
  static async archiveReply(replyId) {
    try {
      await replies.update({ isArchived: true }, {
        where: {
          id: replyId
        },
      });
    } catch (e) {
      throw new Error('Something went wrong', e);
    }
  }
}
export default ReplyQueryModel;
