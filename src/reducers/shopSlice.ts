import { createSlice } from "@reduxjs/toolkit";

export const shopSlice = createSlice({
  name: "shop",
  initialState: [],
  reducers: {
    getShop: (state, { payload }) => {
      state = payload;
    },
  },
});

export const { getShop } = shopSlice.actions;

export default shopSlice.reducer;
