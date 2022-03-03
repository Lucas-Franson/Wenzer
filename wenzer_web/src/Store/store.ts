import { configureStore } from "@reduxjs/toolkit";
import notifyReducer from "./Slices/notifySlice";

export const store = configureStore({
  reducer: {
    counterNotify: notifyReducer,
  },
});
