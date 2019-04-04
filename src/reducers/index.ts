export interface Shop {
  title: string;
  description: string;
  rating: number;
}

export interface ShopState {
  shops: Shop[];
}
export interface AddressState {
  address: string;
}
export interface AddressModalVisibleState {
  addressModalVisible: boolean;
}

export const GET_SHOP = 'GET_SHOP';
export const CHANGE_ADDRESS = 'CHANGE_ADDRESS';
export const TOGGLE_ADDRESSMODAL = 'TOGGLE_ADDRESSMODAL';

export interface GetShopAction {
  type: typeof GET_SHOP;
  payload: Shop;
}

export interface ChangeAddress {
  type: typeof CHANGE_ADDRESS;
  payload: string;
}

export interface ToggleAddressModal {
  type: typeof TOGGLE_ADDRESSMODAL;
}

const shopInitialState: ShopState = {
  shops: [],
};
const addressInitialState: AddressState = {
  address: '',
};
const addressModalVisibleInitialState: AddressModalVisibleState = {
  addressModalVisible: false,
};

export function shopReducer(
  state = shopInitialState,
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

export function addressReducer(
  state = addressInitialState,
  action: ChangeAddress,
): AddressState {
  switch (action.type) {
    case CHANGE_ADDRESS:
      return {
        address: action.payload,
      };
    default:
      return state;
  }
}

export function addressModalReducer(
  state = addressModalVisibleInitialState,
  action: ToggleAddressModal,
): AddressModalVisibleState {
  switch (action.type) {
    case TOGGLE_ADDRESSMODAL:
      return {
        addressModalVisible: !state.addressModalVisible,
      };
    default:
      return state;
  }
}
