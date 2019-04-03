import { Shop, GET_SHOP } from '../reducers';

export function getShop(newShop: Shop) {
  return {
    type: GET_SHOP,
    payload: newShop,
  };
}
