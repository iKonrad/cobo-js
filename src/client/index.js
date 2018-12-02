// Import babel polyfill
import 'babel-polyfill';

// Startup point for the client side bundle
// Import React
import React from 'react';

// Import React DOM
import ReactDOM from 'react-dom';

// Import Browser router
import { BrowserRouter } from 'react-router-dom';

// Import Routes
import Routes from './routes';

// Import react redux library
import { Provider } from 'react-redux';

import createClientStore  from './redux';
import { defaultState } from 'state/reducers';
import Loadable from 'react-loadable';
import './scss/styles.global.scss';
import App from './App';

// Get the initial state passed from the server
let initialState = defaultState;
try {
  initialState = {
    ...defaultState,
    ...JSON.parse(window.INITIAL_STATE),
  }
} catch (e) {
  initialState = defaultState;
}

// Create redux store
const store = createClientStore(initialState);

import { renderRoutes } from 'react-router-config';

Loadable.preloadReady().then(() => {
  const routes = renderRoutes(Routes);

// Build a react component for the application
  const Page = () => (
    <Provider store={store}>
      <BrowserRouter>
        <App>{routes}</App>
      </BrowserRouter>
    </Provider>
  )

  ReactDOM.hydrate(<Page />, document.getElementById('root'));
})

