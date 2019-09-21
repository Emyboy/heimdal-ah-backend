import models from '../models';
import StatusResponse from '../helpers/StatusResponse';

const { roles, profiles, users } = models;
const checkUserRole = async (req, res, next) => {
  const { role } = req.body;
  if (!role) {
    return StatusResponse.badRequest(res, {
      message: 'Role is required'
    });
  }
  try {
    const userRoles = await roles.findOne({
      where: {
        name: role
      }
    });
    if (!userRoles) {
      return StatusResponse.notfound(res, {
        message: 'This role cannot be assigned'
      });
    }
    req.app.locals.roleId = userRoles.id;
    return next();
  } catch (error) {
    return StatusResponse.internalServerError(res, {
      message: `something went wrong, please try again.... ${error}`
    });
  }
};

const checkUserExist = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await users.findById(userId, {
      include: [{
        model: roles,
        attributes: ['id', 'name']
      }, {
        model: profiles
      }],
      attributes: ['id']
    });

    if (!user) {
      return StatusResponse.notfound(res, {
        message: 'User not found'
      });
    }
    req.app.locals.user = user;
    return next();
  } catch (error) {
    return StatusResponse.internalServerError(res, {
      message: `something went wrong, please try again.... ${error}`
    });
  }
};

const checkUserId = (req, res, next) => {
  req.checkParams('userId', 'User Id must be an Integer').isInt();
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
};

export { checkUserRole, checkUserExist, checkUserId };
