const paths = require('./paths');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base');
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const EntryChunksPlugin = require('./plugins/chunksPlugin');

module.exports = function (isProduction) {
  const clientConfig = {
    // Tell webpack the root file of our server application
    entry: './src/client/index.tsx',

    // Tell webpack where to put the output file that is generated
    output: {
      filename: 'js/client.js',
      chunkFilename: 'js/[name].chunk.js',
      path: paths.public,
      publicPath: '/',
    },

    // Global variables
    plugins: [
      new ReactLoadablePlugin({
        filename: paths.exported + '/modules.json',
      }),
      new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
      new EntryChunksPlugin({
        filename: 'webpack.stats.json',
        path: paths.exported,
        publicPath: paths.public,
      }),
      new CopyWebpackPlugin([
        {
          from: paths.static,
          to: paths.public,
          force: true, // This flag forces overwrites between versions
        },
      ]),
    ],
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 50000,
        cacheGroups: {
          vendor: {
            test: /node_modules/,
            name (module) {
              let packageName = '';
              if (module.context.endsWith('client/scss')) {
                packageName = 'vendor';
              } else {
                const result = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                if (result) {
                  packageName = `npm.${result[1].replace('@', '')}`;
                }
              }
              return packageName;
            },
          },
        },
      },
    },
  };
  return merge(baseConfig, clientConfig);
}
