const asyncHandler = require('express-async-handler');
const UserAdmin = require('../models/userAdminModel');

// POST - Create user account
const createUserAdminAccount = asyncHandler(async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;
  if (!username || !email || !password || !passwordConfirm) {
    res.status(400);
    throw new Error('All field must be completed');
  }

  if (password !== passwordConfirm) {
    res.status(400);
    throw new Error("The confirmation password don't match with the password");
  }

  const isUserExist = await UserAdmin.findOne({ email });
  if (isUserExist) {
    res.status(400);
    throw new Error('This email is already used');
  }

  await UserAdmin.register(
    new UserAdmin({ username, email }),
    req.body.password,
    (err, user) => {
      if (err) {
        console.log('error while user register!', err);
        res.status(400);
        throw new Error('Your account could not be saved');
      } else {
        res.status(200).json({
          endpoint: 'Register user',
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      }
    }
  );
});

// POST - Create user session
const createUserAdminSession = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'Login user', user: req.user });
});

// GET - Show user account
const showUserAdminAccount = asyncHandler(async (req, res) => {
  res.status(200).json({ endpoint: 'Profile user', user: req.user });
});

// DELETE - Delete session user
const deleteSessionUserAdmin = asyncHandler(async (req, res) => {
  req.logout();
  req.session.destroy();
  res
    .clearCookie('connect.sid')
    .status(200)
    .json({ endpoint: 'Delete session user', user: req.user.username });
});

module.exports = {
  createUserAdminAccount,
  createUserAdminSession,
  showUserAdminAccount,
  deleteSessionUserAdmin,
};
