import settings from 'settings';

// Import redux specific functions
import { createStore, applyMiddleware, compose } from 'redux';

import { middleware as thunkMiddleware } from 'redux-saga-thunk'

// Import Middlewares
import createSagaMiddleware from 'redux-saga';

import loggerMiddleware from 'redux-logger'

import reducers from 'state/reducers';

import rootSaga from 'sagas';

const sagaRunner = createSagaMiddleware();

// Create store for the client
const createClientStore = (initialState = {}) => {

  const middlewares = [
    thunkMiddleware,
    sagaRunner,
  ];

  if (settings.ENV !== 'production') {
    middlewares.push(loggerMiddleware)
  }

  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(
        ...middlewares
      ),
      (!SERVER && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    )
  );
  sagaRunner.run(rootSaga);
  return store;
}

export default createClientStore;



