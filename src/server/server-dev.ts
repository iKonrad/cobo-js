// @ts-ignore
import KoaRouter from 'koa-router';
import server from './server';

(async () => {
  const { app, createAppHandler, listen } = server;

  const router = new KoaRouter();
  app
    .use(router.routes())
    .use(router.allowedMethods());


  router.get('/*', () => { console.log('???'); });
  // router.all('/api/*', createAppHandler(stats.assets.main.js, stats.assets.main.css));
  await listen();
})();
