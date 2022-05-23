const authHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized');
  }
};

module.exports = {
  authHandler,
};
