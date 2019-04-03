import { reducer } from '../reducers';
import { createStore, combineReducers } from 'redux';

const rootReducer = combineReducers({
  shop: reducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer);
