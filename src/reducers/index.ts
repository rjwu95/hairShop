import {
  ShopState,
  GetShopAction,
  GET_SHOP,
  ChangeAddress,
  CHANGE_ADDRESS,
  ToggleAddressModal,
  TOGGLE_ADDRESSMODAL,
  ChangeMode,
  CHANGE_MODE,
} from './types';

const initialState: ShopState = {
  shops: [],
  address: '',
  addressModalVisible: false,
  mode: 'region',
};

export function shopReducer(
  state = initialState,
  action: GetShopAction | ChangeAddress | ToggleAddressModal | ChangeMode,
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
    case CHANGE_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    default:
      return state;
  }
}
