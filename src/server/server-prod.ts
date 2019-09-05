import { readFileSync } from 'fs';
import path from 'path';
// @ts-ignore
import stats from 'exported/webpack.stats.json';
import server from './server';

const manifest = JSON.parse(readFileSync(path.resolve('dist', 'manifest.json'), 'utf8'));

const styles = [
  manifest['main.css'],
  manifest['vendor.css'],
];

const scripts = [
  manifest['vendor.js'],
  manifest['main.js'],
];

(async () => {
  const { app, createAppHandler, listen } = server;
  app.use(createAppHandler(stats.assets.main.js, stats.assets.main.css));
  await listen();
})();
