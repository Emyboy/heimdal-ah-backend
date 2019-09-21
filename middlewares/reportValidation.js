import StatusResponse from '../helpers/StatusResponse';

const reportValidation = (req, res, next) => {
  const { reportType, context } = req.body;
  const reportTypesArr = ['spam', 'plagarism', 'others'];
  if (!reportTypesArr.includes(reportType)) {
    return StatusResponse.badRequest(res, {
      message: 'please enter a valid report type'
    });
  }
  if (!context) {
    return StatusResponse.badRequest(res, {
      message: 'please enter a valid context'
    });
  }
  return next();
};
export default reportValidation;
