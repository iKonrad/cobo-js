const webpack = require('webpack');
const createCss = require('./common/css');
const serverConfig = require('./common/server');
const merge = require('webpack-merge');
const Common = require('./common/common');

const css = createCss(false);

const serverDevConfig = {
  // Tell webpack the root file of our server application
  entry: './src/server/server-dev.js',

  // Tell webpack if we're on development or production environment
  mode: 'development',

  module: {
    rules: [
      // CSS loaders
      ...css.getExtractCSSLoaders(false /* sourceMaps = true */),
    ],
  },
  plugins: [
    Common.getProgressBar('Server', 'development'),
  ]
};

module.exports = merge(serverConfig, serverDevConfig);
