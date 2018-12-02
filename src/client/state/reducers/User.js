
import * as Constants from 'state/constants/User';

export const defaultState = {
  authenticated: false,
  sessionToken: null,
  data: null,
  users: [],
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case Constants.AUTHENTICATE_SUCCESS: {
      return {
        ...state,
        authenticated: true,
        sessionToken: action.payload.sessionToken
      };
    }
    case Constants.FETCH_USER_DATA_NOT_LOGGED_IN:
    case Constants.FETCH_USER_DATA_FAILURE:
    case Constants.AUTHENTICATE_FAILURE: {
    return {
      ...state,
      authenticated: false,
      sessionToken: null,
      data: null,
    };
  }
    case Constants.FETCH_USER_DATA_SUCCESS: {
      return {
        ...state,
        authenticated: true,
        data: action.payload,
      };
    }
    case Constants.FETCH_USERS_SUCCESS: {
      const newState = {...state};
      newState.users = action.payload;
      return newState;
    }

    case Constants.FETCH_USERS_FAILURE: {
      const newState ={ ...state };
      newState.users = defaultState.users;
      return newState;
    }
    case Constants.LOGOUT_FINISHED: {
      const newState = { ...state };
      newState.authenticated = false;
      newState.sessionToken = null;
      newState.data = null;
      return newState;
    }
  }
  return state;
}
