import Constants from 'state/constants/User';
import * as Actions from 'state/actions/User';
import User from 'utils/helpers/User';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import api from 'utils/ApiClient';
import { State, PayloadAsync, PayloadWithToken } from 'types';

interface PayloadAuthenticate extends PayloadAsync {
  username: string,
  password: string,
}

export function* authenticate(payload: PayloadAuthenticate) {
  const response = yield call(User.Fetchers.authenticate, payload.username, payload.password);
  if (response.sessionToken) {
    yield put(Actions.authenticateSuccess(response.sessionToken, payload.meta));
  } else {
    yield put(Actions.authenticateFailure(payload.meta, response.errors));
  }
}

export function* logout(payload: PayloadAsync) {
  const sessionToken = yield select((state: State) => state.user.sessionToken);
  if (sessionToken) {
    yield call(User.Fetchers.logout, sessionToken);
    yield put(Actions.logoutFinished(payload.meta));
  }
}

export function* fetchUserData(payload: PayloadWithToken) {
  let token = payload.sessionToken;
  if (!token || token === '') {
    token = yield select((state: State) => state.user.sessionToken);
  }

  if (token) {
    const data = yield call(User.Fetchers.getUserData, token);
    if (data && data.data) {
      yield put(Actions.fetchUserDataSuccess(data.data, payload.meta));
    } else {
      yield put(Actions.fetchUserDataFailure(payload.meta, data.errors));
    }
  } else {
    yield put(Actions.fetchUserDataNotLoggedIn(payload.meta));
  }
}

export function* watch() {
  yield all([
    takeEvery(Constants.AUTHENTICATE, authenticate),
    takeEvery(Constants.FETCH_USER_DATA, fetchUserData),
    takeEvery(Constants.LOGOUT, logout),
  ]);
}
