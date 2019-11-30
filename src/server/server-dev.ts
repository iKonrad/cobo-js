import path from 'path';
import { ChunkExtractor } from '@loadable/server';
import KoaRouter from 'koa-router';
import server from './server';

(async () => {
  const { app, createAppHandler, listen } = server;

  const router = new KoaRouter();
  app
    .use(router.routes())
    .use(router.allowedMethods());

  const statsFile = path.resolve('dist/public/loadable-stats.json');
  const extractor = new ChunkExtractor({
    statsFile,
    publicPath: '/',
  });

  router.get('/*', createAppHandler(extractor));
  router.all('/api/*', createAppHandler(extractor));
  await listen();
})();
