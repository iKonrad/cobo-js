import server from './server';
import stats from 'exported/webpack.stats.json';


(async () => {
  const { app, createAppHandler, listen } = server;
  app.use(createAppHandler(stats.assets.main.js, stats.assets.main.css));
  await listen();
})();
