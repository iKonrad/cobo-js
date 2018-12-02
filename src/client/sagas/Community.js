import * as Constants from 'state/constants/Community';
import * as Actions from 'state/actions/Community';
import { startLoading, stopLoading } from 'state/actions/App'
import Community from 'utils/helpers/Community';
import { all, call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';

export function* createCommunity({meta, data}) {
  const sessionToken = yield select(state => state.user.sessionToken);

  const loading = yield put(startLoading());
  const response  = yield call(Community.Fetchers.createCommunity, sessionToken, data);
  if (response.data) {
    yield put(Actions.createCommunitySuccess(response, meta));
  } else {
    yield put(Actions.createCommunityFailure(response, meta));
  }
  yield put(stopLoading(loading.processId));
}

export function* subscribeCommunity({meta, payload: { communityId }}) {
  const sessionToken = yield select(state => state.user.sessionToken);
  const response = yield call(Community.Fetchers.subscribeCommunity, communityId, sessionToken);

  if (response.membership) {
    yield put(Actions.subscribeCommunitySuccess(response.membership, meta));
  } else {
    yield put(Actions.subscribeCommunityFailure(meta));
  }
}

export function* unsubscribeCommunity({meta, payload: { communityId }}) {
  const sessionToken = yield select(state => state.user.sessionToken);
  const response = yield call(Community.Fetchers.unsubscribeCommunity, communityId, sessionToken);

  if (response.success) {
    yield put(Actions.unsubscribeCommunitySuccess(communityId, meta));
  } else {
    yield put(Actions.unsubscribeCommunityFailure(meta));
  }
}

export function* fetchCurrentCommunity({meta, id}) {
  yield put(startLoading('community'));
  const sessionToken = yield select(state => state.user.sessionToken);
  const response = yield call(Community.Fetchers.fetchCommunity, id, sessionToken);
  if (!response.data || response.data.errors) {
    yield put(Actions.fetchCurrentCommunityFailure(response, meta));
  } else {
    yield put(Actions.fetchCurrentCommunitySuccess(response.data, meta));
  }
  yield put(stopLoading('community'));
}

export function* watch() {
  yield all([
    takeEvery(Constants.CREATE_COMMUNITY, createCommunity),
    takeEvery(Constants.FETCH_CURRENT_COMMUNITY, fetchCurrentCommunity),
    takeLatest(Constants.SUBSCRIBE_COMMUNITY, subscribeCommunity),
    takeLatest(Constants.UNSUBSCRIBE_COMMUNITY, unsubscribeCommunity),
  ])
}
