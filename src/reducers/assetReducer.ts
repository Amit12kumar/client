// src/reducers/assetsReducer.ts
import { AssetActionTypes, FETCH_ASSETS_REQUEST, FETCH_ASSETS_SUCCESS, FETCH_ASSETS_FAILURE, Asset } from '../types';

interface AssetsState {
  data: Asset[];
  loading: boolean;
  error: string | null;
}

const initialState: AssetsState = {
  data: [],
  loading: false,
  error: null,
};

const assetsReducer = (state: AssetsState = initialState, action: AssetActionTypes): AssetsState => {
  switch (action.type) {
    case FETCH_ASSETS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ASSETS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_ASSETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default assetsReducer;
