import { createSlice } from "@reduxjs/toolkit";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    currentSubscription: null,
  },
  reducers: {
    updateSubscription: (state, action) => {
      let subscription = action.payload?.payload
        ? action.payload.payload
        : action.payload;
      state.currentSubscription = subscription;
    },
    resetSubscription: (state, action) => {
      state.currentSubscription = null;
    },
  },
});

export const { updateSubscription } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
