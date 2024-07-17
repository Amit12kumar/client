// src/reducers/index.ts
import { combineReducers } from 'redux';
import assetsReducer from './assetReducer';

const rootReducer = combineReducers({
  assets: assetsReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
