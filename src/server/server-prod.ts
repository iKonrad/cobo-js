import { readFileSync } from 'fs';
import path from 'path';
// @ts-ignore
import stats from 'exported/webpack.stats.json';
import KoaRouter from 'koa-router';
import * as Loadable from 'react-loadable';
import server from './server';

(async () => {
  const { app, createAppHandler, listen } = server;
  await Loadable.preloadAll();

  const router = new KoaRouter();
  app
    .use(router.routes())
    .use(router.allowedMethods());
  router.get('/*', createAppHandler(stats.assets.main.js, stats.assets.main.css, Loadable));
  router.all('/api/*', createAppHandler(stats.assets.main.js, stats.assets.main.css, Loadable));
  await listen();
})();
