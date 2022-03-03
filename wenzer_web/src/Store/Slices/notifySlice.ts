import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const notifyCounterSlice = createSlice({
  name: "notifyCounter",
  initialState,
  reducers: {
    //Actions
    incrementCounterNotify: (state) => {
      state.value += 1
    },
    removeAllNotify: (state) => {
        state.value = 0;
    }
  },
});

export const selectCounterNotify = (state: any) => state.counterNotify.value

export const { incrementCounterNotify, removeAllNotify } = notifyCounterSlice.actions;

export default notifyCounterSlice.reducer;
