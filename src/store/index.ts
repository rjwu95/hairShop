import { shopReducer, addressReducer, addressModalReducer } from '../reducers';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  shop: shopReducer,
  address: addressReducer,
  addressModalVisible: addressModalReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer);
