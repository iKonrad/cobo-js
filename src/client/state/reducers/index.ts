import { combineReducers } from 'redux';
import userReducer, { defaultState as userState } from 'state/reducers/User';
import appReducer, { defaultState as appState } from 'state/reducers/App';
import { reducer as formReducer } from 'redux-form';
import { State } from 'types';

export default combineReducers({
  user: userReducer,
  form: formReducer,
  app: appReducer,
});

export const defaultState = <State> {
  user: userState,
  app: appState,
  form: {},
};
