import * as Constants from '../constants/User'

export const authenticate = (username, password) => ({
  type: Constants.AUTHENTICATE,
  username,
  password,
  meta: {
    thunk: true,
  }
});

export const authenticateSuccess = (sessionToken, meta) => ({
  type: Constants.AUTHENTICATE_SUCCESS,
  payload: {
    sessionToken
  },
  meta,
});

export const authenticateFailure = (meta, errors = []) => ({
  type: Constants.AUTHENTICATE_FAILURE,
  payload: {
    errors,
  },
  meta,
});

export const fetchUserData = (sessionToken) => ({
  type: Constants.FETCH_USER_DATA,
  sessionToken,
  meta: {
    thunk: true,
  }
});

export const fetchUserDataSuccess = (data, meta) => ({
  type: Constants.FETCH_USER_DATA_SUCCESS,
  payload: {
    ...data,
  },
  meta,
});

export const fetchUserDataFailure = (meta, errors = []) => ({
  type: Constants.FETCH_USER_DATA_FAILURE,
  payload: {
    errors,
  },
  meta,
});

export const fetchUserDataNotLoggedIn = (meta) => ({
  type: Constants.FETCH_USER_DATA_NOT_LOGGED_IN,
  meta,
});

export const logout = () => ({
  type: Constants.LOGOUT,
  meta: {
    thunk: true,
  }
})

export const logoutFinished = (meta) => ({
  type: Constants.LOGOUT_FINISHED,
  meta,
})

export const fetchUsers = () => ({
  type: Constants.FETCH_USERS,
  meta: {
    thunk: true,
  }
})

export const fetchUsersSuccess = (data, meta) => ({
  type: Constants.FETCH_USERS_SUCCESS,
  meta,
  payload: data,
})

export const fetchUsersFailure = (meta) => ({
  type: Constants.FETCH_USERS_FAILURE,
  meta,
})
