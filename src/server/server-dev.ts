// @ts-ignore
import stats from 'exported/webpack.stats.json';
import server from './server';


(async () => {
  const { app, createAppHandler, listen } = server;
  app.use(createAppHandler(stats.assets.main.js, stats.assets.main.css));
  await listen();
})();
