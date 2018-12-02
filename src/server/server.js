import 'babel-polyfill';
import Koa from 'koa';

import http from 'http';

import serveStatic from 'koa-static';
import Loadable from 'react-loadable';
import settings from 'settings';
import createAppHandler from './helpers/appHandler';
import apiProxyHandler from './helpers/apiProxyHandler';

// Import global SCSS
import './../client/scss/styles.global.scss';

// Create Koa server instance
const app = new Koa();

app.use(serveStatic('dist/public/', {
  defer: false,
  gzip: true,
  br: true,
  maxAge: 30 * 24 * 60 * 60 * 1000,
}));

app.use(apiProxyHandler);

// Listener function that will start http(s) server(s) based on userland
// config and available ports
const listen = async () => {
  // Spawn the listeners.
  const servers = [];
  Loadable.preloadAll().then(() => {
    const protocol = http;
    servers.push(
      protocol.createServer(app.callback()).listen(settings.PORT, () => {
        console.log('Listening on port', settings.PORT);
      })
  );
  });

  return servers;
};

export default {
  createAppHandler,
  app,
  listen,
}
