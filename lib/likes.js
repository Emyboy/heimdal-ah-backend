import Models from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { likes, users } = Models;
const findLikes = async (payload) => {
  const { userId, articleId, commentId } = payload;
  const ifExist = await likes.findOne({
    where: {
      userId,
      articleId,
      commentId
    }
  });
  return ifExist;
};

const deleteLikes = async (payload) => {
  const { userId, articleId, commentId } = payload;
  try {
    await likes.destroy({
      where: {
        userId,
        articleId,
        commentId
      }
    });
    return null;
  } catch (error) {
    return error;
  }
};

const createLikes = async (payload) => {
  const { userId, articleId, commentId } = payload;
  try {
    //  if like does not exist create new like
    const Likes = await likes.create({
      userId,
      articleId,
      commentId
    });
    return Likes;
  } catch (error) {
    return StatusResponse.internalServerError(error);
  }
};

const listOfLikers = async (payload) => {
  const { articleId, commentId } = payload;
  const numOfLikes = await likes.findAndCountAll({
    where: {
      articleId,
      commentId,
    },
    include: [{
      model: users,
      as: 'user',
      attributes: [
        'id', 'email', 'roleId'
      ]

    }]
  });
  return numOfLikes;
};

export {
  createLikes,
  deleteLikes,
  findLikes,
  listOfLikers
};
