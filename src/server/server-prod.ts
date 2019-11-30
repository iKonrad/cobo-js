import { readFileSync } from 'fs';
import path from 'path';
// @ts-ignore
import stats from 'dist/loadable-stats.json';
import KoaRouter from 'koa-router';
import server from './server';

(async () => {
  const { app, createAppHandler, listen } = server;

  const router = new KoaRouter();
  app
    .use(router.routes())
    .use(router.allowedMethods());
  // router.get('/*', createAppHandler(stats.assets.main.js, stats.assets.main.css));
  // router.all('/api/*', createAppHandler(stats.assets.main.js, stats.assets.main.css));
  await listen();
})();
