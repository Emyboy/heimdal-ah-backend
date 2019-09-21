/**
 * @description - This class is all about server response
 * @returns {class} Response
 */
class StatusResponse {
  /**
   * @description - success response
   * @param {object} res
   * @param {object} data
   * @returns {object} Success
   */
  static success(res, data) {
    return res.status(200).json(data);
  }

  /**
   * @description - Not found response
   * @param {object} res
   * @param {object} data
   * @returns {object} Not found
   */
  static notfound(res, data) {
    return res.status(404).json(data);
  }

  /**
   * @description - Internal server error response
   * @param {object} res
   * @param {object} data
   * @returns {object} Error
   */
  static internalServerError(res, data) {
    return res.status(500).json(data);
  }

  /**
   * @description - bad request
   * @param {object} res
   * @param {object} data
   * @returns {object} Error
   */
  static badRequest(res, data) {
    return res.status(400).json(data);
  }

  /**
   * @description - created response
   * @param {object} res
   * @param {object} data
   * @returns {object} Created
   */
  static created(res, data) {
    return res.status(201).json(data);
  }

  /**
   * @description - Unauthorized credentials
   * @param {object} res
   * @param {object} data
   * @returns {object} Unauthorized
   */
  static unauthorized(res, data) {
    return res.status(401).json(data);
  }

  /**
   * @param {object} res
   * @param {object} data
   * @returns {object} json data
   */
  static conflict(res, data) {
    return res.status(409).json(data);
  }

  /**
   * @description - forbidden credentials
   * @param {object} res
   * @param {object} data
   * @returns {object} forbidden
   */
  static forbidden(res, data) {
    return res.status(403).json(data);
  }

  /**
   * @description - no content
   * @param {object} res
   * @param {object} data
   * @returns {object} forbidden
   */
}

export default StatusResponse;
