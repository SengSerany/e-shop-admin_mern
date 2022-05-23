require('dotenv').config();
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_URI,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = { cloudinary };
