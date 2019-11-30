const webpack = require('webpack');
const merge = require('webpack-merge');
const LoadablePlugin = require('@loadable/webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');
const baseConfig = require('./base');
const paths = require('./paths');

const serverConfig = {
  // Inform webpack that we're building a bundle
  // for Node JS rather than for the browser
  target: 'node',

  // Tell webpack where to put the output file that is generated
  output: {
    filename: 'server.js',
    chunkFilename: '[name]-[contenthash].chunk.js',
    path: paths.dist,
    publicPath: paths.public,
  },

  externals: [
    webpackNodeExternals(),
  ],
  plugins: [
    new LoadablePlugin(),
    new webpack.DefinePlugin({
      // We're not running on the server
      SERVER: true,
      'process.env': {
        // Debug development
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};

module.exports = merge(baseConfig, serverConfig);
