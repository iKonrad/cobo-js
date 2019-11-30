const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const baseConfig = require('./base');
const paths = require('./paths');
const HashedChunkidsPlugin = require('webpack-hashed-chunkids');

module.exports = function (isProduction) {
  const clientConfig = {
    // Tell webpack the root file of our server application
    entry: `${paths.client}/index.tsx`,

    // Tell webpack where to put the output file that is generated
    output: {
      filename: 'js/[name]-[contenthash].js',
      chunkFilename: 'js/[name]-[contenthash].chunk.js',
      path: paths.public,
      publicPath: '/',
    },

    // Global variables
    plugins: [
      new LoadablePlugin(),
      new HashedChunkidsPlugin({ // So the chunk IDs don't change with each compilation
        hashFunction: 'md5',
        hashDigest: 'hex',
        hashDigestLength: 4,
      }),
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
      new CopyWebpackPlugin([
        {
          from: paths.static,
          to: paths.public,
          force: true, // This flag forces overwrites between versions
        },
      ]),
    ],
  };
  return merge(baseConfig, clientConfig);
};
