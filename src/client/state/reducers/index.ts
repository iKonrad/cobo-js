import { combineReducers } from 'redux';
import userReducer, { defaultState as userState } from 'state/reducers/User';
import appReducer, { defaultState as appState } from 'state/reducers/App';
import { State } from 'types';

export default combineReducers({
  user: userReducer,
  app: appReducer,
});

export const defaultState = <State> {
  user: userState,
  app: appState,
};
