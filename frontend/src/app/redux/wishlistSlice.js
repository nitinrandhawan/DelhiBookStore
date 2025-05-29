const { createSlice } = require("@reduxjs/toolkit");

// Load wishlist from localStorage
const loadWishlistFromStorage = () => {
  try {
    const data = localStorage.getItem("wishlistItems");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading wishlist from localStorage:", error);
    return [];
  }
};

// Save wishlist to localStorage
const saveWishlistToStorage = (wishlist) => {
  try {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
  } catch (error) {
    console.error("Error saving wishlist to localStorage:", error);
  }
};

const initialState = {
  wishlistItems: loadWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.wishlistItems.find(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.wishlistItems.push(action.payload);
        saveWishlistToStorage(state.wishlistItems);
      }
    },

    removeFromWishlist: (state, action) => {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );
      saveWishlistToStorage(state.wishlistItems);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
