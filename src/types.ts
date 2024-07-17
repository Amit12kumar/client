// src/types.ts
export interface Asset {
    symbol: string;
    price: number;
    timestamp: string;
}

export const FETCH_ASSETS_REQUEST = 'FETCH_ASSETS_REQUEST';
export const FETCH_ASSETS_SUCCESS = 'FETCH_ASSETS_SUCCESS';
export const FETCH_ASSETS_FAILURE = 'FETCH_ASSETS_FAILURE';

export const UPDATE_ASSET_REQUEST = 'UPDATE_ASSET_REQUEST';
export const UPDATE_ASSET_SUCCESS = 'UPDATE_ASSET_SUCCESS';
export const UPDATE_ASSET_FAILURE = 'UPDATE_ASSET_FAILURE';

export interface UpdateAssetRequestAction {
    type: typeof UPDATE_ASSET_REQUEST;
    payload: { id: string; price: number };
}

export interface UpdateAssetSuccessAction {
    type: typeof UPDATE_ASSET_SUCCESS;
    payload: Asset;
}

export interface UpdateAssetFailureAction {
    type: typeof UPDATE_ASSET_FAILURE;
    payload: any;
}

export interface FetchAssetsRequestAction {
    type: typeof FETCH_ASSETS_REQUEST;
    payload: string;
}

export interface FetchAssetsSuccessAction {
    type: typeof FETCH_ASSETS_SUCCESS;
    payload: Asset[];
}

export interface FetchAssetsFailureAction {
    type: typeof FETCH_ASSETS_FAILURE;
    payload: any;
}

export type AssetActionTypes =
    | FetchAssetsRequestAction
    | FetchAssetsSuccessAction
    | FetchAssetsFailureAction
    | UpdateAssetRequestAction
    | UpdateAssetSuccessAction
    | UpdateAssetFailureAction;
