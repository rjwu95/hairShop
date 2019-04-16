import { shopReducer } from '../reducers';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  shopReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer);
