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

export interface ShopState {
  shops: Shop[];
  address: string;
  addressModalVisible: boolean;
  mode: string;
}

export const GET_SHOP = "GET_SHOP";
export const CHANGE_ADDRESS = "CHANGE_ADDRESS";
export const TOGGLE_ADDRESSMODAL = "TOGGLE_ADDRESSMODAL";
export const CHANGE_MODE = "CHANGE_MODE";

export interface GetShopAction {
  type: typeof GET_SHOP;
  payload: Shop[];
}

export interface ChangeAddress {
  type: typeof CHANGE_ADDRESS;
  payload: string;
}

export interface ToggleAddressModal {
  type: typeof TOGGLE_ADDRESSMODAL;
}

export interface ChangeMode {
  type: typeof CHANGE_MODE;
  payload: string;
}
