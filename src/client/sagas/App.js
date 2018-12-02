import * as Constants from 'state/constants/App';
import * as Actions from 'state/actions/App';
import api from 'utils/ApiClient';
import { all, call, put, takeEvery } from 'redux-saga/effects';

export function* fetchTranslations({code, meta}) {
    try {
    const {data} = yield call(api.call, {
      url: '/locales',
      headers: {
        'Accept-Language': code,
      }
    });

    if (data.data) {
      yield put(Actions.fetchTranslationsSuccess(data.data, meta));
    } else {
      yield put (Actions.fetchTranslationsFailure(meta));
    }
  } catch(e) {
    yield put (Actions.fetchTranslationsFailure(meta));
  }
}

export function* watchApp() {
  yield all([
    takeEvery(Constants.FETCH_TRANSLATIONS, fetchTranslations),
  ])
}
