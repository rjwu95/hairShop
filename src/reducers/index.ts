export interface Shop {
  title: string;
  description: string;
  rating: number;
}

export interface State {
  shops: Shop[];
  address: string;
}

export const GET_SHOP = 'GET_SHOP';
export const CHANGE_ADDRESS = 'CHANGE_ADDRESS';

export interface GetShopAction {
  type: typeof GET_SHOP;
  payload: Shop;
}

export interface ChangeAddress {
  type: typeof CHANGE_ADDRESS;
  payload: string;
}

const initialState: State = {
  shops: [],
  address: '',
};

export function reducer(
  state = initialState,
  action: GetShopAction | ChangeAddress,
): State {
  switch (action.type) {
    case GET_SHOP:
      return {
        shops: [...state.shops, action.payload],
        address: state.address,
      };
    case CHANGE_ADDRESS:
      return {
        shops: state.shops,
        address: action.payload,
      };
    default:
      return state;
  }
}
