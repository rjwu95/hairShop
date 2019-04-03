import { Shop, GET_SHOP, CHANGE_ADDRESS } from '../reducers';

export function getShop(newShop: Shop) {
  return {
    type: GET_SHOP,
    payload: newShop,
  };
}

export function changeAddress(newAddress: string) {
  return {
    type: CHANGE_ADDRESS,
    payload: newAddress,
  };
}
