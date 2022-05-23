const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');
const { cloudinary } = require('../config/cloudinary');

// GET - Index products
const indexProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

// GET - Show product
const showProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Couldn't find the product for show");
  }

  res.status(200).json({
    endpoint: 'Show product',
    product: product,
  });
});

// POST - Create product
const createProduct = asyncHandler(async (req, res) => {
  const { image, title, author, medium, format, description, price } = req.body;

  if (
    !image ||
    !title ||
    !author ||
    !medium ||
    !format ||
    !description ||
    !price
  ) {
    res.status(400);
    throw new Error('All field must be completed');
  }

  const uploadResponse = await cloudinary.uploader.upload(image, {
    upload_preset: 'art_gallery_api_pieces',
  });

  try {
    const product = await Product.create({
      image: uploadResponse.url,
      title,
      author,
      medium,
      format,
      description,
      price,
    });

    res.status(200).json(product);
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errValidation = [];

      Object.keys(error.errors).forEach((key) => {
        errValidation.push(error.errors[key].message);
      });

      res.status(400);
      throw new Error(errValidation);
    }
    res.status(400);
    throw new Error('Something went wrong');
  }
});

// PATCH - Update product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const { image, title, author, medium, format, description, price } = req.body;

  if (!product) {
    res.status(400);
    throw new Error("Couldn't find the product for update");
  }

  if (
    !image ||
    !title ||
    !author ||
    !medium ||
    !format ||
    !description ||
    !price
  ) {
    res.status(400);
    throw new Error('All field must be completed');
  }

  let uploadResponse;
  if (!image.startsWith('http')) {
    uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: 'art_gallery_api_pieces',
    });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        image: uploadResponse ? uploadResponse.url : image,
        title,
        author,
        medium,
        format,
        description,
        price,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    if (error.name === 'ValidationError') {
      let errValidation = [];

      Object.keys(error.errors).forEach((key) => {
        errValidation.push(error.errors[key].message);
      });

      res.status(400);
      throw new Error(errValidation);
    }
    res.status(400);
    throw new Error('Something went wrong');
  }
});

// DELETE - Delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Couldn't find the product for delete");
  }

  await product.remove();

  res.status(200).json({
    _id: product._id,
    title: product.title,
  });
});

module.exports = {
  indexProducts,
  showProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
