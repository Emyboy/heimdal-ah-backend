import StatusResponse from '../helpers/StatusResponse';
/**
* @description ArticlesValidation class
*/
class ArticleValidation {
  /**
   * @description - validate article creation
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} Returned object
   */
  static async validateInput(req, res, next) {
    req.checkBody('title', 'title cannot be empty').notEmpty();
    req.checkBody('title', 'title Length cannot be more than 1500 characters').isLength({ max: 1500 });
    req.checkBody('description', 'description cannot be empty').notEmpty();
    req.checkBody('description', 'description Length cannot be more than 1500 characters').isLength({ max: 2500 });
    req.checkBody('body', 'body cannot be empty').notEmpty();

    try {
      const errors = await req.validationErrors();

      const err = [];
      if (errors) {
        errors.forEach(({ param, msg }) => {
          if (!err[param]) {
            err[param] = {
              msg
            };
          }
        });
        return StatusResponse.badRequest(res, { errors: { ...err } });
      }
      return next();
    } catch (error) {
      const payload = {
        message: 'Something went wrong', error
      };
      return StatusResponse.internalServerError(res, payload);
    }
  }

  /**
   * @param {object} req Takes comment request
   * @param {object} res Response to request
   * @param {object} next Move to the next function
   * @return {object} User validation response to user
   */
  static checkArticleId(req, res, next) {
    req.checkParams('identifier', 'Article Id must be an Integer').isInt();
    const errors = req.validationErrors();
    const err = [];

    if (errors) {
      errors.forEach(({ param, msg }) => {
        if (!err[param]) {
          err[param] = {
            msg
          };
        }
      });
      return StatusResponse.badRequest(res, { errors: { ...err } });
    }
    return next();
  }
}

export default ArticleValidation;
