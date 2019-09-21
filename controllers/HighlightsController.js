import models from '../models';
import StatusResponse from '../helpers/StatusResponse';
import highlightsLogic from '../lib/highlightsLogic';

const { HighlightedText, users: User } = models;
const { updateHighlights } = highlightsLogic;
/**
 * Highlights Controller
 * @description This controller creates and stores highlighted texts with or without comments when
 * a portion of an article is selected.
 * @description It also fetches all the highlighted texts belonging to an article
 * @description It also fetches all the comments belonging to a highlighted section of an article
 * when the highlighted section is clicked
 */
class HighlightsController {
  /**
   * @description  Method to create a highlights alone
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object
   */
  static async create(req, res) {
    const { userId } = req.app.locals.user;
    const { articleId } = req.params;
    const { highlightedText, comment } = req.body;
    const { body } = req.app.locals.article;

    const startIndex = req.body.startIndex || body.indexOf(highlightedText);
    const stopIndex = req.body.stopIndex || startIndex + highlightedText.length;
    const highlightId = `${startIndex}-${stopIndex}`;

    try {
      const createdHighlight = await HighlightedText.create({
        highlightId,
        startIndex,
        stopIndex,
        comment,
        articleId,
        userId,
        text: highlightedText
      });

      const payload = {
        success: true,
        message: 'You successfully highlighted a section of this article',
        createdHighlight
      };
      return StatusResponse.created(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `Something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description  Method to fetch all highlights belonging to an article
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object
   */
  static async fetchByArticleId(req, res) {
    const { articleId } = req.params;

    try {
      const highlightedPortions = await HighlightedText.findAll({
        where: {
          articleId,
          stillExist: true
        },
        group: ['highlightId', 'id']
      });

      const payload = {
        success: true,
        message: 'All highlights belonging to this article has been fetched successfully',
        highlightedPortions
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `Something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description  Method to fetch all comments belonging to a highlight
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object
   */
  static async fetchAHighlightsComments(req, res) {
    const { articleId, highlightId } = req.params;

    try {
      const comments = await HighlightedText.findAll({
        where: {
          articleId,
          highlightId,
          comment: {
            $ne: null
          }
        },
        include: {
          model: User,
          attributes: ['id', 'email']
        },
        attributes: ['comment']
      });

      const payload = {
        success: true,
        message: 'All comments belonging to this highlight has been fetched successfully',
        highlightId,
        comments
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `Something went wrong, please try again.... ${error}`
      });
    }
  }

  /**
   * @description  Method to update an articles highlighted indexes if the articles body is updated
   * @param {object} req
   * @param {object} res
   * @returns {object} The reponse object
   */
  static async update(req, res) {
    const { userId } = req.app.locals.user;
    const { highlightedPortions } = req.body;
    const { body } = req.app.locals.article;

    try {
      const updatedPortions = await updateHighlights(highlightedPortions, body, userId);

      const payload = {
        success: true,
        message: 'Highlight indexes have been updated',
        updatedPortions
      };
      return StatusResponse.success(res, payload);
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: `Something went wrong, please try again.... ${error}`
      });
    }
  }
}

export default HighlightsController;
