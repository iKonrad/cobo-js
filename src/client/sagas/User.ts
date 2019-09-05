import Constants from 'state/constants/User';
import { Actions } from 'state/actions/User';
import User from 'utils/helpers/User';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import { State, ActionType } from 'types';

export function* authenticate(action: ActionType) {
  const response = yield call(User.Fetchers.authenticate, action.payload.username, action.payload.password);
  if (response.sessionToken) {
    yield put(Actions.authenticateSuccess(response.sessionToken, action.meta));
  } else {
    yield put(Actions.authenticateFailure(action.meta, response.errors));
  }
}

export function* logout(payload: ActionType) {
  const sessionToken = yield select((state: State) => state.user.sessionToken);
  if (sessionToken) {
    yield call(User.Fetchers.logout, sessionToken);
    yield put(Actions.logoutFinished(payload.meta));
  }
}

export function* fetchUserData(action: ActionType) {
  let token = action.payload.sessionToken;
  if (!token || token === '') {
    token = yield select((state: State) => state.user.sessionToken);
  }

  if (token) {
    const data = yield call(User.Fetchers.getUserData, token);
    if (data && data.data) {
      yield put(Actions.fetchUserDataSuccess(data.data, action.meta));
    } else {
      yield put(Actions.fetchUserDataFailure(action.meta, data.errors));
    }
  } else {
    yield put(Actions.fetchUserDataNotLoggedIn(action.meta));
  }
}

export function* watch() {
  yield all([
    takeEvery(Constants.AUTHENTICATE, authenticate),
    takeEvery(Constants.FETCH_USER_DATA, fetchUserData),
    takeEvery(Constants.LOGOUT, logout),
  ]);
}
