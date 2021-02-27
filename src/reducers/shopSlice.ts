import {
  CaseReducer,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import * as shopAPI from "../apis/shopAPI";

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

export const fetchShopByRegion = createAsyncThunk(
  "shop/fetchByRegionStatus",
  async (region: string) => {
    const response = await shopAPI.fetchByRegion(region);
    return response.data;
  }
);

export const fetchShopByLocation = createAsyncThunk(
  "shop/fetchByLocationStatus",
  async () => {
    const response = await shopAPI.fetchByLocation();
    return response.data;
  }
);

const initialState: ShopSlice = {
  value: [],
};

const getShopReducer: CaseReducer<ShopSlice, PayloadAction<Shop[]>> = (
  state,
  { payload }
) => {
  state.value = payload;
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    getShop: getShopReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchShopByRegion.fulfilled, (state, action) => {
      state.value = [...action.payload];
    });
    builder.addCase(fetchShopByLocation.fulfilled, (state, action) => {
      state.value = [...action.payload];
    });
  },
});

export const { getShop } = shopSlice.actions;

export default shopSlice.reducer;
