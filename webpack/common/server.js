const webpack = require('webpack');
const paths = require('./paths');
const merge = require('webpack-merge');
const baseConfig = require('./base');
const NodemonPlugin = require( 'nodemon-webpack-plugin');
const webpackNodeExternals = require('webpack-node-externals');

const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;

const serverConfig = {
  // Inform webpack that we're building a bundle
  // for Node JS rather than for the browser
  target: 'node',

  // Tell webpack where to put the output file that is generated
  output: {
    filename: 'server.js',
    chunkFilename: '[name].server.js',
    path: paths.dist,
    publicPath: paths.public,
  },

  externals: [
    webpackNodeExternals()
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      // We're not running on the server
      SERVER: true,
      'process.env': {
        // Debug development
        NODE_ENV: JSON.stringify('development'),
      },
    }),
    new NodemonPlugin({
      watch: paths.dist,
      script: paths.dist + '/server.js',
      delay: 300,
    }),
  ],
};

module.exports = merge(baseConfig, serverConfig);
