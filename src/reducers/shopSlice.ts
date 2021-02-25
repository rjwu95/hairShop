import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Menu {
  [key: string]: Array<any>;
}
export interface Shop {
  _id: string;
  name: string;
  address: string[];
  category: string;
  contact: string;
  homepage: string;
  image: string[];
  location: { lat: number; lng: number };
  menu: Menu;
  openingHours: string[];
}

export type ShopSlice = {
  value: Shop[];
};

const initialState: ShopSlice = {
  value: [],
};

const getShopReducer: CaseReducer<ShopSlice, PayloadAction<Shop[]>> = (
  state,
  { payload }
) => {
  console.log("reducer!!!!!");
  state.value = payload;
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    getShop: getShopReducer,
  },
});

export const { getShop } = shopSlice.actions;

export default shopSlice.reducer;
