// src/actions.ts
import {
  FETCH_ASSETS_REQUEST, FETCH_ASSETS_SUCCESS, FETCH_ASSETS_FAILURE, FetchAssetsRequestAction, FetchAssetsSuccessAction, FetchAssetsFailureAction, Asset,
  UPDATE_ASSET_REQUEST,
  UPDATE_ASSET_SUCCESS,
  UPDATE_ASSET_FAILURE,
  UpdateAssetRequestAction,
  UpdateAssetSuccessAction,
  UpdateAssetFailureAction,

} from './types';

export const fetchAssetsRequest = (symbol: string): FetchAssetsRequestAction => ({
  type: FETCH_ASSETS_REQUEST,
  payload: symbol,
});

export const fetchAssetsSuccess = (data: Asset[]): FetchAssetsSuccessAction => ({
  type: FETCH_ASSETS_SUCCESS,
  payload: data,
});

export const fetchAssetsFailure = (error: any): FetchAssetsFailureAction => ({
  type: FETCH_ASSETS_FAILURE,
  payload: error,
});

export const updateAssetRequest = (id: string, price: number): UpdateAssetRequestAction => ({
  type: UPDATE_ASSET_REQUEST,
  payload: { id, price },
});

export const updateAssetSuccess = (asset: Asset): UpdateAssetSuccessAction => ({
  type: UPDATE_ASSET_SUCCESS,
  payload: asset,
});

export const updateAssetFailure = (error: any): UpdateAssetFailureAction => ({
  type: UPDATE_ASSET_FAILURE,
  payload: error,
});

