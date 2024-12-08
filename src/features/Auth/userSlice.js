import { createSlice } from "@reduxjs/toolkit";
const initialState = null;
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUserData: (state, action) => {
            // console.log("儲存");
            return action.payload;
        },
        resetUserData: () => {
            // console.log("重置");
            return initialState;
        },
    },
});

export const { saveUserData, resetUserData } = userSlice.actions;
export default userSlice.reducer;
