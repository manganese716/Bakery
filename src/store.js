import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../src/features/Cart/cartSlice.js";
import userReducer from "../src/features/Auth/userSlice.js";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        user: userReducer,
    },
});
