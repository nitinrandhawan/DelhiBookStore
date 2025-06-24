import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const fetchProductsByMainCategory = createAsyncThunk(
  "productByMainCategory/fetchProductsByMainCategory",
  async ({ limit = 50, page = 1,subcategoryId }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `/product/product-by-main-category/${subcategoryId}?limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const productByMainCategorySlice = createSlice({
  name: "productByCategory",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByMainCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByMainCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.products;
      })
      .addCase(fetchProductsByMainCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productByMainCategorySlice.reducer;
