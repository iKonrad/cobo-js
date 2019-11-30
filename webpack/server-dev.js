const babelLoader = require('./common/babel-loader');
const webpack = require('webpack');
const merge = require('webpack-merge');
const createCss = require('./common/css');
const serverConfig = require('./common/server');
const NodemonPlugin = require('nodemon-webpack-plugin');
const Common = require('./common/common');
const paths = require('./common/paths');

const css = createCss(false);

const serverDevConfig = {
  // Tell webpack the root file of our server application
  entry: `${paths.server}/server-dev.ts`,

  // Tell webpack if we're on development or production environment
  mode: 'development',

  // Watch for file changes
  watch: true,

  module: {
    rules: [
      // CSS loaders
      ...css.getExtractCSSLoaders(false /* sourceMaps = true */),
      ...babelLoader(true),
    ],
  },
  plugins: [
    Common.getProgressBar('Server', 'development'),
    new NodemonPlugin({
      watch: paths.dist,
      script: `${paths.dist}/server.js`,
    }),
  ],
};

module.exports = merge(serverConfig, serverDevConfig);
