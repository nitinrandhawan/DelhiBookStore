import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../features/axiosInstance";

// Actual API function to send POST request
const postCartItemToAPI = async (cartItem) => {
  const res = await axiosInstance.post("/cart/get-all-carts", cartItem);
  return res.data;
};

// AsyncThunk for API-based add to cart
export const addToCartAPIThunk = createAsyncThunk(
  "cart/addToCartAPIThunk",
  async (cartItem, { rejectWithValue }) => {
    try {
      const data = await postCartItemToAPI(cartItem);
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    // LocalStorage version for guests
    addToCart: (state, action) => {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
        existing.totalPrice = existing.quantity * existing.price;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAPIThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCartAPIThunk.fulfilled, (state, action) => {
        const existing = state.items.find((i) => i.id === action.payload.id);
        if (existing) {
          existing.quantity += 1;
          existing.totalPrice = existing.quantity * existing.price;
        } else {
          state.items.push({ ...action.payload, quantity: 1 });
        }
        state.loading = false;

        // Optional: Sync localStorage here if you want persistence
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      })
      .addCase(addToCartAPIThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
