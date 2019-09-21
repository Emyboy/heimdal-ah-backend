
const publishAcess = (req, res, next) => {
  const { roleId } = req.app.locals.user;
  if (roleId === 1 || roleId === 3) {
    return next();
  }
  return res.status(401).json({
    message: 'You do not have enough permission',
  });
};

const admin = (req, res, next) => {
  const { roleId } = req.app.locals.user;
  if (roleId === 1) {
    return next();
  }
  return res.status(401).json({
    message: 'Only available to admin',
  });
};

export { publishAcess, admin };
