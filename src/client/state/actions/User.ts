import TypeKeys from 'state/constants/User';
import { createAction, Meta, ActionsUnion, UserDataState } from 'types';

export const Actions = {
  authenticate: (username: string, password: string) => createAction(
    TypeKeys.AUTHENTICATE,
    {
      username,
      password,
    },
    {
      thunk: true,
    },
  ),
  authenticateSuccess: (sessionToken: string, meta: Meta) => createAction(
    TypeKeys.AUTHENTICATE_SUCCESS,
    { sessionToken },
    meta,
  ),
  authenticateFailure: (meta: Meta, errors: object[]) => createAction(
    TypeKeys.AUTHENTICATE_FAILURE,
    { errors },
    meta,
  ),
  fetchUserData: (sessionToken: string|null) => createAction(
    TypeKeys.FETCH_USER_DATA,
    { sessionToken },
    {
      thunk: true,
    },
  ),
  fetchUserDataSuccess: (data: UserDataState, meta: Meta) => createAction(
    TypeKeys.FETCH_USER_DATA_SUCCESS,
    data,
    meta,
  ),
  fetchUserDataFailure: (meta: Meta, errors: object[]) => createAction(
    TypeKeys.FETCH_USER_DATA_FAILURE,
    { errors },
    meta,
  ),
  fetchUserDataNotLoggedIn: (meta: Meta) => createAction(
    TypeKeys.FETCH_USER_DATA_NOT_LOGGED_IN,
    meta,
  ),
  logout: () => createAction(
    TypeKeys.LOGOUT,
    { thunk: true },
  ),
  logoutFinished: (meta: Meta) => createAction(
    TypeKeys.LOGOUT_FINISHED,
    meta,
  ),
};

export type Actions = ActionsUnion<typeof Actions>;
