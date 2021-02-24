import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import addressSlice from "../reducers/addressSlice";
import modeSlice from "../reducers/modeSlice";
import shopSlice from "../reducers/shopSlice";
import { Shop } from "../reducers/types";

export type Store = {
  address: {
    modal: boolean;
    value: string;
  };
  shop: Shop[];
  mode: "region" | "current";
};

const store = configureStore({
  reducer: {
    address: addressSlice,
    mode: modeSlice,
    shop: shopSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
