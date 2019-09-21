import slugify from 'slugify';
import models from '../models';

const { tags: Tag } = models;
const checkIdentifier = identifier => (Number.isInteger(parseInt(identifier, 10))
  ? { id: identifier }
  : { slug: identifier });

const checkTitle = (title, articleTitle) => {
  if (articleTitle !== null) {
    return `${slugify(title)}-${Math.floor(Math.random() * (25 ** 6)).toString(36)}`;
  }
  return slugify(title);
};

const checkUser = (article, userId) => article.userId === userId;

const userIsOnwerOrAdmin = (article, userId, roleId) => roleId === 1 || article.userId === userId;

/**
 * @description This method is used to create new tags abd return the created tag ids
 * @param {Array} tags - An array of tags <= 5
 * @param {Object} article - the recently created sequelize article
 * @returns {Object} object - the sequelize object of article tags
 */
const createNewTags = async (tags) => {
  let tagList = await tags.map(async thisTag => Tag.findOrCreate({
    where: {
      tagName: thisTag
    }
  }));

  tagList = await Promise.all(tagList);
  const tagIds = tagList.map(pickedTag => pickedTag[0].id);

  return tagIds;
};

const calcReadingTime = (bodyText) => {
  const matches = bodyText.match(/\S+/g);
  const numberOfWords = matches ? matches.length : 0;
  const averageWordsPerMinute = 225;
  const readingTime = Math.ceil(numberOfWords / averageWordsPerMinute);

  return readingTime > 1 ? `${readingTime} mins read` : `${readingTime} min read`;
};

const isPublished = article => article.isPublished;

const checkUserRole = (roleId, userId) => {
  let where = { isArchived: false };

  if (roleId === 1) {
    where = {};
  }
  if (!userId) {
    where = {
      isArchived: false,
      isPublished: true
    };
  }
  return where;
};

export {
  checkIdentifier, checkUser, checkTitle, createNewTags, calcReadingTime, isPublished,
  userIsOnwerOrAdmin, checkUserRole
};
