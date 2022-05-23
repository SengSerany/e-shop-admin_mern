import axios from 'axios';

const API_URL = '/api/v1/products';

// Create product
const createProduct = async (productData) => {
  const response = await axios.post(`${API_URL}/new`, productData);

  return response.data;
};

// Get all products

const getAllProducts = async () => {
  const response = await fetch(`${API_URL}/`);
  const data = await response.json();
  if (data) {
    return data;
  } else {
    return [];
  }
};

// Update product
const updateProduct = async (productData) => {
  const response = await axios.patch(
    `${API_URL}/${productData._id}/edit`,
    productData
  );

  return response.data;
};

// Delete product
const deleteProduct = async (productID) => {
  const response = await axios.delete(`${API_URL}/${productID}/delete`);

  return response.data;
};

const productService = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};

export default productService;
