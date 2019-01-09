import babelLoader from './common/babel-loader';

const webpack = require('webpack');
const merge = require('webpack-merge');
const createMiniExtractPlugin = require('mini-css-extract-plugin');
const createCss = require('./common/css');
const clientConfig = require('./common/client');
const Common = require('./common/common');

const extractCSS = new createMiniExtractPlugin({
  filename: 'css/style.css',
  chunkFileName: 'css/[id].chunk.css',
});

const css = createCss(false);

const clientDevConfig = {
  // Tell webpack if we're on development or production environment
  mode: 'development',
  // Watch for file changes
  watch: true,
  module: {
    rules: [
      // CSS loaders
      ...css.getDevLoaders(createMiniExtractPlugin.loader, true),
      ...babelLoader(false),
    ],
  },
  plugins: [
    extractCSS,
    // Global variables
    new webpack.DefinePlugin({
      // We're not running on the server
      SERVER: false,
      'process.env': {
        // Optimise React, etc
        NODE_ENV: JSON.stringify('development'),
        DEBUG: true,
      },
    }),
    Common.getProgressBar('Client', 'development'),
  ],
  optimization: {
    splitChunks: {
      minSize: 1000000,
    },
  },
};

module.exports = merge(clientConfig(false), clientDevConfig);
