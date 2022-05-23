const express = require('express');
const productRouter = express.Router();
const { authHandler } = require('../middleware/authMiddleware');
const {
  indexProducts,
  showProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

productRouter.get('/', authHandler, indexProducts);
productRouter.get('/:id', authHandler, showProduct);
productRouter.post('/new', authHandler, createProduct);
productRouter.patch('/:id/edit', authHandler, updateProduct);
productRouter.delete('/:id/delete', authHandler, deleteProduct);

module.exports = productRouter;
