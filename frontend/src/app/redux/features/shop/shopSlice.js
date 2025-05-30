// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axiosInstance";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit = 12, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/product/get-all-products?limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error fetching products");
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    products: [],
    totalPages: 0,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
