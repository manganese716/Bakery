import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        pushToCart(state, action) {
            state.push({
                id: action.payload.id,
                productName: action.payload.name,
                quantity: 1,
                price: action.payload.price,
                imgURL: action.payload.imgURL,
            });
        },
        increase(state, action) {
            const product = state.find((P) => P.id === action.payload.id);
            product.quantity += 1;
        },
        decrease(state, action) {
            const productIndex = state.findIndex(
                (P) => P.id === action.payload.id,
            );

            if (productIndex !== -1) {
                if (state[productIndex].quantity > 1) {
                    state[productIndex].quantity -= 1;
                } else {
                    state.splice(productIndex, 1);
                }
            }
        },
        setQuantity(state, action) {
            const productIndex = state.findIndex(
                (P) => P.id === action.payload.id,
            );

            if (productIndex !== -1) {
                state[productIndex].quantity = action.payload.quantity;
            }
        },
        remove(state, action) {
            return state.filter((p) => p.id !== action.payload);
        },
        resetCart() {
            return [];
        },
    },
});

export const {
    pushToCart,
    increase,
    decrease,
    remove,
    setQuantity,
    resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
