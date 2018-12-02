import * as Constants from 'state/constants/Post';
import * as Actions from 'state/actions/Post';
import Post from 'utils/helpers/Post';
import Comment from 'utils/helpers/Comment';
import { all, call, put, takeEvery, takeLatest, select } from 'redux-saga/effects'

export function* createPost({communityId, meta, data}) {
  const response  = yield call(Post.Fetchers.createPost, communityId, data);
  if (response.data) {
    yield put(Actions.createPostSuccess(response, meta));
  } else {
    yield put(Actions.createPostFailure(response, meta));
  }
}

export function* fetchCurrentPost({meta, id}) {
  const sessionToken = yield select(state => state.user.sessionToken);
  const response = yield call(Post.Fetchers.fetchPost, sessionToken, id);
  if (response.data) {
    yield put(Actions.fetchCurrentPostSuccess(response.data, meta));
  } else {
    yield put(Actions.fetchCurrentPostFailure(response, meta));
  }
}

export function* votePost({payload: {upvote, id}, meta, type}) {
  const sessionToken = yield select(state => state.user.sessionToken);
  const response = yield call(Post.Fetchers.votePost, sessionToken, id, upvote);
  if (response.id) {
    yield put(Actions.votePostSuccess(id, response.score, response.totalVotes, upvote, meta));
  } else {
    yield put(Actions.votePostFailure(meta));
  }
}

export function* voteComment({payload: {upvote, commentId}, meta, type}) {
  const response = yield call(Comment.Fetchers.voteComment, commentId, upvote);
  if (response.id) {
    yield put(Actions.voteCommentSuccess(commentId, response.score, response.totalVotes, upvote, meta));
  } else {
    yield put(Actions.voteCommentFailure(meta));
  }
}

export function* postComment({payload: { text, parentId, postId }, meta}) {
  const response = yield call(Comment.Fetchers.postComment, postId, parentId, text);

  if (response.data) {
    yield put(Actions.postCommentSuccess(response.data, meta));
  } else {
    yield put(Actions.postCommentFailure(response.errors, meta));
  }
}

export function* deleteComment({ payload: { id }, meta }) {
  const response = yield call(Comment.Fetchers.deleteComment, id);

  if (response)  {
    yield put(Actions.deleteCommentSuccess(id, meta));
  } else {
    yield put(Actions.deleteCommentFailure(id, meta));
  }
}

export function* editComment ({ payload: { id, text }, meta }) {
  const response = yield call(Comment.Fetchers.editComment, id, text);

  if (response.data) {
    yield put(Actions.editCommentSuccess(id, text, meta));
  } else {
    yield put(Actions.editCommentFailure(response.errors, meta));
  }
}

export function* watch() {
  yield all([
    takeEvery(Constants.CREATE_POST, createPost),
    takeEvery(Constants.FETCH_CURRENT_POST, fetchCurrentPost),
    takeLatest(Constants.VOTE, votePost),
    takeLatest(Constants.COMMENT_VOTE, voteComment),
    takeLatest(Constants.COMMENT_UNVOTE, voteComment),
    takeLatest(Constants.COMMENT_POST, postComment),
    takeLatest(Constants.COMMENT_DELETE, deleteComment),
    takeLatest(Constants.COMMENT_EDIT, editComment),
  ])
}
