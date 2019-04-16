import {
  ShopState,
  GetShopAction,
  GET_SHOP,
  ChangeAddress,
  CHANGE_ADDRESS,
  ToggleAddressModal,
  TOGGLE_ADDRESSMODAL,
} from './types';

const initialState: ShopState = {
  shops: [],
  address: '',
  addressModalVisible: false,
};

export function shopReducer(
  state = initialState,
  action: GetShopAction | ChangeAddress | ToggleAddressModal,
): ShopState {
  switch (action.type) {
    case GET_SHOP:
      return {
        ...state,
        shops: [...action.payload],
      };
    case CHANGE_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case TOGGLE_ADDRESSMODAL:
      return {
        ...state,
        addressModalVisible: !state.addressModalVisible,
      };
    default:
      return state;
  }
}
