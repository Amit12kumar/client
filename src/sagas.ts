// src/sagas.ts
import { call, put, takeLatest, StrictEffect } from 'redux-saga/effects';
import axios from 'axios';
import { fetchAssetsSuccess, fetchAssetsFailure, updateAssetSuccess,
  updateAssetFailure,} from './actions';
import { FETCH_ASSETS_REQUEST, FetchAssetsRequestAction, UPDATE_ASSET_REQUEST, UpdateAssetRequestAction, Asset} from './types'

function* fetchAssetsSaga(action: FetchAssetsRequestAction): Generator<StrictEffect, void, { data: Asset[] }> {
    console.log("action", action)
  try {
    const response = yield call(axios.get, `http://localhost:4000/api/assets/${action.payload}`);
    yield put(fetchAssetsSuccess(response.data));
  } catch (error) {
    yield put(fetchAssetsFailure(error));
  }
}

function* updateAssetSaga(action: UpdateAssetRequestAction): Generator<StrictEffect, void, { data: Asset }> {
  try {
    const response = yield call(axios.put, `http://localhost:4000/api/assets/${action.payload.id}`, {
      price: action.payload.price,
    });
    yield put(updateAssetSuccess(response.data));
  } catch (error) {
    yield put(updateAssetFailure(error));
  }
}

function* rootSaga() {
  yield takeLatest<FetchAssetsRequestAction>(FETCH_ASSETS_REQUEST, fetchAssetsSaga);
  yield takeLatest<UpdateAssetRequestAction>(UPDATE_ASSET_REQUEST, updateAssetSaga);
}

export default rootSaga;
