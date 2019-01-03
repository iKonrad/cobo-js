import TypeKeys from 'state/constants/User';
import { UserState } from 'types';
import { Actions } from 'state/actions/User';

export const defaultState: UserState = {
  authenticated: false,
  sessionToken: null,
  data: null,
};

export default (state: UserState = defaultState, action: Actions): UserState => {
  switch (action.type) {
    case TypeKeys.AUTHENTICATE_SUCCESS: {
      return {
        ...state,
        authenticated: true,
        sessionToken: action.payload.sessionToken,
      };
    }
    case TypeKeys.FETCH_USER_DATA_NOT_LOGGED_IN:
    case TypeKeys.FETCH_USER_DATA_FAILURE:
    case TypeKeys.AUTHENTICATE_FAILURE: {
      return {
        ...state,
        authenticated: false,
        sessionToken: null,
        data: null,
      };
    }
    case TypeKeys.FETCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        authenticated: true,
        data: action.payload,
      };
    }
    case TypeKeys.LOGOUT_FINISHED: {
      const newState = { ...state };
      newState.authenticated = false;
      newState.sessionToken = null;
      newState.data = null;
      return newState;
    }
    default:
      return state;
  }
};
