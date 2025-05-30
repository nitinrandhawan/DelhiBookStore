import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";
import bannerReducer from "./features/banners/bannerSlice";
import categoryReducer from "./features/getAllCategory/categorySlice";
import signupReducer from "./features/auth/signupSlice";
import loginReducer from "./features/auth/loginSlice";
import productReducer from "./features/shop/shopSlice";
import productByCategoryReducer from "./features/productByCategory/productByCategorySlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    banners: bannerReducer,
    category: categoryReducer,
    auth: signupReducer,
    login: loginReducer,
    products: productReducer,
    productByCategory: productByCategoryReducer,
  },
});
