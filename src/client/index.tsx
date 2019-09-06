// Import babel polyfill
import 'babel-polyfill';

// Startup point for the client side bundle
// Import React
import * as React from 'react';

// Import React DOM
import * as ReactDOM from 'react-dom';

// Import Browser router
import { BrowserRouter } from 'react-router-dom';

import { Provider as ServerDataProvider } from 'components/hoc/ServerData';

// Import react redux library
import { Provider } from 'react-redux';

import { defaultState } from 'state/reducers';

import Loadable from 'react-loadable';

import './scss/styles.global.scss';

import { renderRoutes } from 'react-router-config';

import App from './App';

import createClientStore from './store';
import Routes from './routes';

import GlobalWrapper from './GlobalWrapper';

// Get the initial state passed from the server
let initialState = defaultState;
try {
  initialState = {
    ...defaultState,
    ...JSON.parse((window as any).INITIAL_STATE),
  };
} catch (e) {
  initialState = defaultState;
}

let serverData = {};
try {
  serverData = JSON.parse((window as any).SERVER_DATA);
} catch (e) {}

// Create redux store
const store = createClientStore(initialState);

Loadable.preloadReady().then(() => {
  const routes = renderRoutes(Routes);

  // Build a react component for the application
  const Page = () => (
    <ServerDataProvider data={serverData}>
      <BrowserRouter>
        <Provider store={store}>
          <GlobalWrapper>

            <App>{routes}</App>

          </GlobalWrapper>
        </Provider>
      </BrowserRouter>
    </ServerDataProvider>
  );

  ReactDOM.hydrate(<Page />, document.getElementById('root'));
});
