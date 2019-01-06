import TypeKeys from 'state/constants/App';
import { Actions } from 'state/actions/App';
import api from 'utils/ApiClient';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import { ActionType } from 'types';

export function* fetchTranslations(action: ActionType) {
  try {
    const { data } = yield call(api.request, {
      url: '/locales',
      headers: {
        'Accept-Language': action.payload.code,
      },
    });

    if (data.data) {
      yield put(Actions.fetchTranslationsSuccess(data.data, action.meta));
    } else {
      yield put(Actions.fetchTranslationsFailure(action.meta));
    }
  } catch (e) {
    yield put(Actions.fetchTranslationsFailure(action.meta));
  }
}

export function* watchApp() {
  yield all([
    takeEvery(TypeKeys.FETCH_TRANSLATIONS, fetchTranslations),
  ]);
}
