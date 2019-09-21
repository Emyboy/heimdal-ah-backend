import StatusResponse from '../helpers/StatusResponse';

// This function checks for an article id being an integer on [articles rating]
const checkArticlesId = (req, res, next) => {
  const { articleId } = req.params;
  if (!Number.isInteger(+articleId)) {
    res.status(400).json({
      errors: {
        body: ['Articles Id must be an integer']
      }
    });
  }
  return next();
};

// This function checks for a user entering valid ratings input [articles rating]
const validRatingsInput = (req, res, next) => {
  if (!req.body.stars || req.body.stars < 1 || req.body.stars > 5) {
    return StatusResponse.badRequest(res, {
      errors: {
        body: ['Invalid input']
      }
    });
  }
  return next();
};

// Export all middlewares here
export {
  checkArticlesId,
  validRatingsInput
};
