import models from '../models';
import StatusResponse from '../helpers/StatusResponse';
// import pagination from '../helpers/pagination';

const {
  users, profiles, roles,
} = models;

/**
 * @description RolesController class
 */
class RolesController {
  /**
   * @description Fetch all the users
   * @param {Object} req - HTTP Request Object
   * @param {Object} res - HTTP Response Object
   * @return {Object} Returned object
   */
  static async getUsers(req, res) {
    try {
      const allUsers = await users.findAll({
        include: [{
          model: roles,
          attributes: ['id', 'name']
        }, {
          model: profiles
        }],
        attributes: ['id']
      });

      return StatusResponse.success(res, {
        message: 'success',
        users: allUsers
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: 'Something went wrong'
      });
    }
  }

  /**
   * @description Update a user role
   * @param {Object} req - HTTP Request Object
   * @param {Object} res - HTTP Response Object
   * @return {Object} Returned object
   */
  static async update(req, res) {
    const { role } = req.body;
    const { roleId, user } = req.app.locals;

    try {
      await user.updateAttributes({ roleId });
      user.dataValues.role = { id: roleId, name: role };
      return StatusResponse.success(res, {
        message: 'success',
        user,
      });
    } catch (error) {
      return StatusResponse.internalServerError(res, {
        message: 'Something went wrong'
      });
    }
  }

  /**
   * @description Fetch a single user
   * @param {Object} req - HTTP Request Object
   * @param {Object} res - HTTP Response Object
   * @return {Object} Returned object
   */
  static getAUser(req, res) {
    const { user } = req.app.locals;
    return StatusResponse.success(res, {
      message: 'success',
      user,
    });
  }
}

export default RolesController;
