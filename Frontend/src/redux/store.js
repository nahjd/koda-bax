import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/userSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
