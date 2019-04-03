export interface Shop {
  title: string;
  description: string;
  rating: number;
}

export interface ShopState {
  shops: Shop[];
}

export const GET_SHOP = 'GET_SHOP';

export interface GetShopAction {
  type: typeof GET_SHOP;
  payload: Shop;
}

const initialState: ShopState = {
  shops: [],
};

export function shopReducer(
  state = initialState,
  action: GetShopAction,
): ShopState {
  switch (action.type) {
    case GET_SHOP:
      return {
        shops: [...state.shops, action.payload],
      };
    default:
      return state;
  }
}
