import { createStore, applyMiddleware } from 'redux';

// Import middlewarews
import createSagaMiddleware from 'redux-saga';

import { middleware as thunkMiddleware } from 'redux-saga-thunk'

// Import reducers
import reducers, { defaultState } from 'state/reducers';
import rootSaga from '../../client/sagas'

const sagaRunner = createSagaMiddleware();

const createServerStore = () => {
  const store = createStore(reducers, defaultState, applyMiddleware(thunkMiddleware, sagaRunner));
  const rootTask = sagaRunner.run(rootSaga);

  return {
    store,
    rootTask
  };
}

export default createServerStore;
