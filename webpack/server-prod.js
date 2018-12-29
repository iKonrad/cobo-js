import Paths from './common/paths';

const webpack = require('webpack');
const merge = require('webpack-merge');
const createCss = require('./common/css');
const serverConfig = require('./common/server');
const Common = require('./common/common');

const css = createCss(true);

const serverProdConfig = {
  // Tell webpack the root file of our server application
  entry: `${Paths.server}/server-prod.js`,

  // Tell webpack if we're on development or production environment
  mode: 'production',

  module: {
    rules: [
      // CSS loaders
      ...css.getExtractCSSLoaders(true),
    ],
  },
  plugins: [
    Common.getProgressBar('Server', 'production'),
  ],
};

module.exports = merge(serverConfig, serverProdConfig);
