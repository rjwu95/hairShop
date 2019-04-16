import {
  Shop,
  GET_SHOP,
  CHANGE_ADDRESS,
  TOGGLE_ADDRESSMODAL,
} from '../reducers/types';

export function getShop(newShops: Shop[]) {
  return {
    type: GET_SHOP,
    payload: newShops,
  };
}

export function changeAddress(newAddress: string) {
  return {
    type: CHANGE_ADDRESS,
    payload: newAddress,
  };
}

export function toggleAddressModal() {
  return {
    type: TOGGLE_ADDRESSMODAL,
  };
}
