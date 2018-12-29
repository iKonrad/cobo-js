const webpack = require('webpack');
const merge = require('webpack-merge');
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
    chunkFilename: '[name].server.js',
    path: paths.dist,
    publicPath: paths.public,
  },

  externals: [
    webpackNodeExternals(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
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
  ],
};

module.exports = merge(baseConfig, serverConfig);
