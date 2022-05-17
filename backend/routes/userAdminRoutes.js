const express = require('express');
const userAdminRouter = express.Router();
const passport = require('passport');
const {
  createUserAdminAccount,
  createUserAdminSession,
  showUserAdminAccount,
  deleteSessionUserAdmin,
} = require('../controllers/userController');

userAdminRouter.post('/register', createUserAdminAccount);
userAdminRouter.post(
  '/login',
  passport.authenticate('local'),
  createUserAdminSession
);
userAdminRouter.get('/profile', showUserAdminAccount);
userAdminRouter.delete('/logout', deleteSessionUserAdmin);

module.exports = userAdminRouter;
