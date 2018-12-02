import * as Constants from 'state/constants/User';
import * as Actions from 'state/actions/User';
import User from 'utils/helpers/User';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import api from 'utils/ApiClient';

export function* authenticate({username, password, meta}) {
  const response  = yield call(User.Fetchers.authenticate, username, password);
  if (response.sessionToken) {
    yield put(Actions.authenticateSuccess(response.sessionToken, meta));
  } else {
    yield put(Actions.authenticateFailure(meta, response.errors));
  }
}

export function* logout({meta}) {
  const sessionToken = yield select(state => state.user.sessionToken);
  if (sessionToken) {
    yield call(User.Fetchers.logout, sessionToken);
    yield put(Actions.logoutFinished(meta));
  }
}

export function* fetchUserData({meta, sessionToken}) {
  let token = sessionToken;
  if (!token || token === '') {
    token = yield select(state => state.user.sessionToken);
  }

  if (token) {
      const data = yield call(User.Fetchers.getUserData, token);
      if (data && data.data) {
        yield put(Actions.fetchUserDataSuccess(data.data, meta));
      } else {
        yield put(Actions.fetchUserDataFailure(meta, data.errors));
      }
  } else {
    yield put (Actions.fetchUserDataNotLoggedIn(meta));
  }
}

export function* fetchUsers({meta}) {
  try {
    const {data} = yield call(api.get, '/users');
    if (data) {
      yield put(Actions.fetchUsersSuccess(data, meta));
    }
  } catch (e) {
    console.log('Error while pulling users', e.response);
    yield put(Actions.fetchUsersFailure(meta));
  }
}

export function* watch() {
  yield all([
    takeEvery(Constants.FETCH_USERS, fetchUsers),
    takeEvery(Constants.AUTHENTICATE, authenticate),
    takeEvery(Constants.FETCH_USER_DATA, fetchUserData),
    takeEvery(Constants.LOGOUT, logout),
  ])
}
