import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProductState: () => initialState,
  },
  extraReducers: (builder) => {},
});

export const { resetProductState } = productSlice.actions;

export default productSlice.reducer;
