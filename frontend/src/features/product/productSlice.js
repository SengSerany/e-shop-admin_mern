import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from './productService';

const initialState = {
  products: [],
  productSuccess: false,
  productError: false,
  productLoading: false,
  productMessage: '',
};

export const createProduct = createAsyncThunk(
  'product/create',
  async (productData, thunkAPI) => {
    try {
      return await productService.createProduct(productData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getIndexProducts = createAsyncThunk(
  'product/all',
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  'product/update',
  async (productData, thunkAPI) => {
    try {
      return await productService.updateProduct(productData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.productSuccess = false;
      state.productError = false;
      state.productLoading = false;
      state.productMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productError = false;
        state.productSuccess = true;
        state.productMessage = 'You have successfully add a new piece';
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.productSuccess = false;
        state.productError = true;
        state.productMessage = action.payload;
      })
      .addCase(getIndexProducts.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(getIndexProducts.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productError = false;
        state.productSuccess = true;
        state.products = action.payload;
      })
      .addCase(getIndexProducts.rejected, (state, action) => {
        state.productLoading = false;
        state.productSuccess = false;
        state.productError = true;
        state.productMessage = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.productLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.productLoading = false;
        state.productError = false;
        state.productSuccess = true;
        state.productMessage = `You have successfully updated "${action.payload.title}"`;
        console.log(action.payload);
        const updatedProdId = action.payload._id;
        const newStateProducts = state.products.map((product) => {
          if (product._id === updatedProdId) {
            return action.payload;
          } else {
            return product;
          }
        });

        state.products = newStateProducts;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.productLoading = false;
        state.productSuccess = false;
        state.productError = true;
        state.productMessage = action.payload;
      });
  },
});

export const { resetProductState } = productSlice.actions;

export default productSlice.reducer;
