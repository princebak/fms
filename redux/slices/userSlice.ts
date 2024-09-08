import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    justRegisteredUser: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    updateJustRegisteredUser: (state, action) => {
      state.justRegisteredUser = action.payload;
    },
  },
});

export const { loginSuccess, logout, updateJustRegisteredUser } =
  userSlice.actions;

export default userSlice.reducer;
