import * as Constants from 'state/constants/Home';
import * as Actions from 'state/actions/Home';
import Post from 'utils/helpers/Post';
import { all, call, put, takeEvery, select } from 'redux-saga/effects';

function* searchPosts({meta}) {

  const sessionToken = yield select(state => state.user.sessionToken);
  const response = yield call(Post.Fetchers.searchPosts, sessionToken);
  if (response) {
    yield put (Actions.fetchHomepagePostsSuccess(response, meta));
  } else {
    yield put (Actions.fetchHomepagePostsFailure(meta));
  }
}

export function* watchHome() {
  yield all([
    takeEvery(Constants.FETCH_HOMEPAGE_POSTS, searchPosts),
  ])
}
