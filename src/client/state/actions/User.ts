import TypeKeys from 'state/constants/User';
import {
    ActionAsyncPayload,
    ActionAsync,
    ActionWithToken,
} from 'types';

export interface ActionAuthenticate {
  type: TypeKeys.AUTHENTICATE,
  username: string,
  password: string,
  meta: object,
}

export const authenticate = (username: string, password: string): ActionAuthenticate => ({
  type: TypeKeys.AUTHENTICATE,
  username,
  password,
  meta: {
    thunk: true,
  }
});

export const authenticateSuccess = (sessionToken: string|null, meta: object): ActionAsyncPayload => ({
  type: TypeKeys.AUTHENTICATE_SUCCESS,
  payload: {
    sessionToken
  },
  meta,
});



export const authenticateFailure = (meta: object, errors: object[]): ActionAsyncPayload => ({
  type: TypeKeys.AUTHENTICATE_FAILURE,
  payload: {
    errors,
  },
  meta,
});

export const fetchUserData = (sessionToken: string): ActionWithToken => ({
  type: TypeKeys.FETCH_USER_DATA,
  sessionToken,
  meta: {
    thunk: true,
  }
});

export const fetchUserDataSuccess = (data: object, meta: object): ActionAsyncPayload => ({
  type: TypeKeys.FETCH_USER_DATA_SUCCESS,
  payload: {
    ...data,
  },
  meta,
});

export const fetchUserDataFailure = (meta: object, errors: object[]): ActionAsyncPayload => ({
  type: TypeKeys.FETCH_USER_DATA_FAILURE,
  payload: {
    errors,
  },
  meta,
});

export const fetchUserDataNotLoggedIn = (meta: object): ActionAsync => ({
  type: TypeKeys.FETCH_USER_DATA_NOT_LOGGED_IN,
  meta,
});

export const logout = (): ActionAsync => ({
  type: TypeKeys.LOGOUT,
  meta: {
    thunk: true,
  }
});

export const logoutFinished = (meta: object): ActionAsync => ({
  type: TypeKeys.LOGOUT_FINISHED,
  meta,
});

export const fetchUsersSuccess = (data: object, meta: object): ActionAsyncPayload => ({
  type: TypeKeys.FETCH_USERS_SUCCESS,
  meta,
  payload: data,
});

export const fetchUsersFailure = (meta: object): ActionAsync => ({
  type: TypeKeys.FETCH_USERS_FAILURE,
  meta,
});
