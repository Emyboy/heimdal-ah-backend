// import checkUpdateHighlights from '../helpers/checkUpdateHighlights';
import StatusResponse from '../helpers/StatusResponse';
import highlightsLogic from '../lib/highlightsLogic';

const checkHighlightUpdate = async (req, res, next) => {
  const { highlightedPortions } = req.body;
  const { body } = req.app.locals.article;

  const errorMessages = await highlightsLogic.checkUpdateParams(body, highlightedPortions);
  return errorMessages.length === 0
    ? next()
    : StatusResponse.badRequest(res, {
      success: false,
      message: errorMessages
    });
};

const checkHighlightCreate = async (req, res, next) => {
  const { highlightedText } = req.body;
  if (!highlightedText) {
    return StatusResponse.badRequest(res, {
      success: false,
      message: 'Please highlight a text and try again.'
    });
  }
  const thisArticle = req.app.locals.article;

  const { body } = thisArticle;

  const checkHighlightedText = body.includes(highlightedText);
  if (!checkHighlightedText) {
    const payload = {
      success: false,
      message:
        'You can not highlight or comment on this text as it does not exist within the article'
    };
    return StatusResponse.badRequest(res, payload);
  }
  return next();
};

export { checkHighlightUpdate, checkHighlightCreate };
