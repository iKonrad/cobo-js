import { all } from 'redux-saga/effects';
import { watch } from 'sagas/User';
import { watchApp } from 'sagas/App';

export default function* rootSaga() {
  yield all([
    watch(),
    watchApp(),
  ])
}
