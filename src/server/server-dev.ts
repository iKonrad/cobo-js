// @ts-ignore
import stats from 'exported/webpack.stats.json';
import Loadable from 'react-loadable';
import server from './server';

(async () => {
  const { app, createAppHandler, listen } = server;
  await Loadable.preloadAll();
  app.use(createAppHandler(stats.assets.main.js, stats.assets.main.css, Loadable));
  await listen();
})();
