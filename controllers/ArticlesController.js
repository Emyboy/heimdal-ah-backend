import models from '../models';
import StatusResponse from '../helpers/StatusResponse';
import pagination from '../helpers/pagination';
import ArticleQueryModel from '../lib/ArticleQueryModel';
import {
  checkIdentifier,
  checkUser,
  checkTitle,
  createNewTags,
  calcReadingTime,
  userIsOnwerOrAdmin,
  checkUserRole
} from '../helpers/articleHelper';
import ReadingStatsModelQuery from '../lib/ReadingStatsModelQuery';
import eventEmitter from '../helpers/eventEmitter';
import eventTypes from '../events/eventTypes';

const { articles: Article, tags: Tag, HighlightedText } = models;

/**
 * @description ArticlesController class
 */
class ArticlesController {
  /**
   * @description - create articles
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async create(req, res) {
    const { userId } = req.app.locals.user;
    const {
      tags, body, title, description, image
    } = req.body;
    try {
      const articleTitle = await ArticleQueryModel.getArticleByTitle(title);
      const articleSlug = checkTitle(title, articleTitle);
      const readingTime = calcReadingTime(body);
      const newArticle = await Article.create({
        userId,
        title,
        description,
        body,
        image,
        readingTime,
        slug: articleSlug
      });

      if (tags) {
        const createdTags = await createNewTags(tags);
        await newArticle.addTags(createdTags);
        newArticle.dataValues.tags = tags;
      }

      const payload = { article: newArticle, message: 'Article successfully created' };
      return StatusResponse.created(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `Something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description - list articles
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async list(req, res) {
    const {
      size = 20, order = 'ASC', orderBy = 'id', offset = 0
    } = req.query;

    try {
      const articles = await Article.findAndCountAll({
        where: {
          isPublished: true,
          isArchived: false
        },
        include: [
          {
            model: Tag,
            as: 'tags',
            attributes: ['tagName'],
            through: {
              attributes: []
            }
          }
        ],
        limit: size,
        offset,
        order: [[orderBy, order]]
      });
      if (articles.rows.length === 0) {
        return StatusResponse.success(res, {
          message: 'No article found'
        });
      }
      return StatusResponse.success(res, {
        message: 'List of articles',
        articles,
        ...pagination(articles, offset, size)
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description - list archived articles
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async getArchived(req, res) {
    const {
      size = 20, order = 'ASC', orderBy = 'id', offset = 0
    } = req.query;

    try {
      const articles = await Article.findAndCountAll({
        where: {
          isArchived: true
        },
        include: [
          {
            model: Tag,
            as: 'tags',
            attributes: ['tagName'],
            through: {
              attributes: []
            }
          }
        ],
        limit: size,
        offset,
        order: [[orderBy, order]]
      });
      if (articles.rows.length === 0) {
        return StatusResponse.success(res, {
          message: 'No article found'
        });
      }
      return StatusResponse.success(res, {
        message: 'List of archived articles',
        articles,
        ...pagination(articles, offset, size)
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description - list unpublished articles
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async getUnpublished(req, res) {
    const {
      size = 20, order = 'ASC', orderBy = 'id', offset = 0
    } = req.query;

    try {
      const articles = await Article.findAndCountAll({
        where: {
          isPublished: false,
          isArchived: false,
        },
        include: [
          {
            model: Tag,
            as: 'tags',
            attributes: ['tagName'],
            through: {
              attributes: []
            }
          }
        ],
        limit: size,
        offset,
        order: [[orderBy, order]]
      });
      if (articles.rows.length === 0) {
        return StatusResponse.success(res, {
          message: 'No article found'
        });
      }
      return StatusResponse.success(res, {
        message: 'List of unpublished articles',
        articles,
        ...pagination(articles, offset, size)
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description - fetch single article
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async get(req, res) {
    const whereFilter = checkIdentifier(req.params.identifier);
    const { userId, roleId } = req.app.locals.user;

    try {
      const fetchArticle = await Article.findOne({
        where: {
          ...whereFilter,
          ...checkUserRole(roleId, userId)
        },
        include: [
          {
            model: Tag,
            as: 'tags',
            attributes: ['tagName'],
            through: {
              attributes: []
            }
          },
          {
            model: HighlightedText,
            as: 'highlightedPortions'
          }
        ]
      });
      if (!fetchArticle) {
        return StatusResponse.notfound(res, {
          message: 'Could not find article'
        });
      }

      if (userId) {
        const readInfo = {
          articleId: fetchArticle.id,
          userId
        };
        await ReadingStatsModelQuery.createReaderStats(readInfo);
      }
      if ((fetchArticle.userId === userId)
       || (roleId === 3 || (userId && fetchArticle.isPublished))) {
        return StatusResponse.success(res, {
          message: 'success',
          article: fetchArticle
        });
      }

      if (roleId !== 1 && (userId && !fetchArticle.isPublished)) {
        return StatusResponse.notfound(res, {
          message: 'Could not find article'
        });
      }

      return StatusResponse.success(res, {
        message: 'success',
        article: fetchArticle
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error.message}`
      });
    }
  }

  /**
   * @description - update article
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async update(req, res) {
    const { articles } = models;
    const { userId } = req.app.locals.user;
    const whereFilter = checkIdentifier(req.params.identifier);

    const { body, title, tags } = req.body;
    try {
      const article = await ArticleQueryModel.getArticleByIdentifier(whereFilter);
      if (!checkUser(article, userId)) {
        return StatusResponse.forbidden(res, {
          message: 'Request denied'
        });
      }
      if (title) {
        req.body.slug = checkTitle(title, title);
      }
      if (body) {
        req.body.readingTime = calcReadingTime(body);
      }

      const updatedArticle = await articles.update(req.body, {
        where: { ...whereFilter },
        fields: ['slug', 'title', 'body', 'readingTime', 'description', 'image'],
        returning: true
      });

      if (tags) {
        const createdTags = await createNewTags(tags);
        await article.setTags(createdTags);
        updatedArticle['1']['0'].dataValues.tags = tags;
      }

      // Use an event emitter to call updateHighlights
      eventEmitter.emit(
        eventTypes.UPDATEHIGHLIGHT_EVENT,
        article.highlightedPortions,
        updatedArticle[1][0].body,
        userId
      );

      return StatusResponse.success(res, {
        message: 'Article updated successfully, some highlights were adjusted or removed',
        article: updatedArticle
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description - delete article
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async archive(req, res) {
    const { articles } = models;
    const { userId, roleId } = req.app.locals.user;
    const whereFilter = checkIdentifier(req.params.identifier);
    try {
      const article = await ArticleQueryModel.getArticleByIdentifier(whereFilter);

      if (!userIsOnwerOrAdmin(article, userId, roleId)) {
        return StatusResponse.forbidden(res, {
          message: 'Request denied'
        });
      }
      const data = { isArchived: true };
      const archivedArticle = await articles.update(data, {
        where: { ...whereFilter },
        returning: true,
        plain: true
      });
      const payload = roleId === 1
        ? {
          message: 'Article deleted(archived) successfully',
          article: archivedArticle[1]
        }
        : {
          message: 'Article deleted(archived) successfully'
        };
      return StatusResponse.success(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description - publish article
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async publish(req, res) {
    const { articles } = models;
    const whereFilter = checkIdentifier(req.params.identifier);
    try {
      const data = { isPublished: true };
      const article = await articles.update(data, {
        where: { ...whereFilter },
        returning: true,
        plain: true
      });
      return StatusResponse.success(res, {
        message: 'Article published successfully!',
        article: article[1]
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description - publish article
   * @param {object} req
   * @param {object} res
   * @returns {object} Returned object
   */
  static async unpublish(req, res) {
    const { articles } = models;
    const whereFilter = checkIdentifier(req.params.identifier);
    try {
      const data = { isPublished: false };
      const article = await articles.update(data, {
        where: { ...whereFilter },
        returning: true,
        plain: true
      });
      return StatusResponse.success(res, {
        message: 'Article unpublished successfully!',
        article: article[1]
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `something went wrong, please try again.... ${error}`
      });
    }
  }
}

export default ArticlesController;
