const mongoose = require('mongoose');

const checkFormatArray = (value) => {
  return value.length === 3;
};

const productSchema = mongoose.Schema(
  {
    image: {
      type: String,
      Trim: true,
      required: [true, 'You must add an image'],
    },
    title: {
      type: String,
      required: [true, 'You must add a title'],
    },
    author: {
      type: String,
      required: [true, 'You must add an author'],
    },
    medium: {
      type: String,
      required: [true, 'You must add a medium'],
    },
    format: {
      type: [String],
      validate: [
        checkFormatArray,
        'Format must be composed of the 3 completed fields ( height, width, depth)',
      ],
      required: [true, 'You must add the format'],
    },
    description: {
      type: String,
      required: [true, 'You must add a description'],
    },
    price: {
      type: Number,
      required: [true, 'You must add a price'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
