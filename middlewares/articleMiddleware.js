import models from '../models';
import { checkIdentifier, isPublished } from '../helpers/articleHelper';
import StatusResponse from '../helpers/StatusResponse';

const { articles } = models;
const checkArticle = async (req, res, next) => {
  try {
    const identifier = req.params.id || req.params.articleId || req.params.identifier
      || req.params.articleId;
    const whereFilter = checkIdentifier(identifier);
    const fetchedArticle = await articles.findOne({
      where: {
        ...whereFilter,
        isArchived: false
      }
    });
    if (!fetchedArticle) {
      return StatusResponse.notfound(res, {
        message: 'Could not find article'
      });
    }
    req.app.locals.article = fetchedArticle;

    return next();
  } catch (error) {
    return StatusResponse.internalServerError(res, {
      message: `something went wrong, please try again.... ${error}`
    });
  }
};

const checkArticleIsPublished = async (req, res, next) => {
  const { article } = req.app.locals;
  if (!article.isPublished) {
    return StatusResponse.notfound(res, {
      message: 'Could not find article'
    });
  }

  return next();
};

const checkTags = (req, res, next) => {
  const { tags } = req.body;
  if (tags) {
    if (!Array.isArray(tags)) {
      const payload = { message: 'Tags should be an array containing tag names' };
      return StatusResponse.badRequest(res, payload);
    }
    if (tags.length > 7) {
      const payload = { message: 'You can only add a maximum of 7 tags' };
      return StatusResponse.badRequest(res, payload);
    }

    const tagString = tags.map(eachTag => eachTag.toString());
    req.body.tags = tagString;
  }
  return next();
};

const { tags } = models;

const getTagId = async (req, res, next) => {
  let validTags;
  if (Array.isArray(req.query.tag)) {
    validTags = req.query.tag.map(tag => tag.replace(/ /g, ''));
  } else {
    validTags = [req.query.tag].map(tag => tag.replace(/ /g, ''));
  }
  const tag = await tags.findAndCountAll({
    where: {
      tagName: { $ilike: { $any: `{%${validTags}%}` } }
    },
  });
  if (tag.count < 1) {
    return StatusResponse.notfound(res, {
      message: 'No Articles with such tags',
    });
  }
  const tagIds = tag.rows.map(val => val.id);
  req.app.locals.tag = {
    tagIds,
  };
  return next();
};

const checkPublished = (req, res, next) => {
  const isArticlePublished = isPublished(req.app.locals.article);
  if (isArticlePublished) {
    return StatusResponse.badRequest(res, {
      message: 'This article has already been published'
    });
  }
  return next();
};

const checkNotPublished = (req, res, next) => {
  const isArticlePublished = isPublished(req.app.locals.article);
  if (!isArticlePublished) {
    return StatusResponse.badRequest(res, {
      message: 'This article has not been published yet'
    });
  }
  return next();
};

export {
  checkArticle,
  checkTags,
  getTagId,
  checkPublished,
  checkNotPublished,
  checkArticleIsPublished
};
