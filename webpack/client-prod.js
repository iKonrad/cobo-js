import babelLoader from './common/babel-loader';

const webpack = require('webpack');
const merge = require('webpack-merge');
const createMiniExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ManifestPlugin = require('webpack-manifest-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Common = require('./common/common');
const clientConfig = require('./common/client');
const createCss = require('./common/css');
const paths = require('./common/paths');

const extractCSS = new createMiniExtractPlugin({
  filename: 'css/style-[contenthash].css',
  chunkFileName: 'css/[name]-[contenthash].chunk.css',
});

const css = createCss(true);

const clientDevConfig = {
  // Tell webpack if we're on development or production environment
  mode: 'production',
  module: {
    rules: [
      // CSS loaders
      ...css.getProdLoaders(createMiniExtractPlugin.loader),
      ...babelLoader(false),
    ],
  },
  output: {
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].chunk.js',
    path: paths.public,
    publicPath: '/',
  },
  plugins: [
    // Progress bar
    Common.getProgressBar('Client', 'production'),

    // Global variables
    new webpack.DefinePlugin({
      // We're not running on the server
      SERVER: false,
      'process.env': {
        // Optimise React, etc
        NODE_ENV: JSON.stringify('production'),
        DEBUG: false,
      },
    }),

    // Minify the files
    new OptimizeCssAssetsPlugin({
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true,
    }),

    // Check for errors, and refuse to emit anything with issues
    new webpack.NoEmitOnErrorsPlugin(),

    // Also generate .br files, with Brotli compression-- often significantly
    // smaller than the gzip equivalent, but not yet universally supported
    new CompressionPlugin(),

    // Extract CSS to files
    extractCSS,

    // Map hash to module id
    new webpack.HashedModuleIdsPlugin(),

    // Compute chunk hash
    new WebpackChunkHash(),

    // Generate assets manifest
    new ManifestPlugin({
      // Put this in `dist` rather than `dist/public`
      fileName: '../manifest.json',
      // Prefix assets with '/' so that they can be referenced from any route
      publicPath: '',
      inlineManifest: true,
    }),

    // Output interactive bundle report
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: `${paths.dist}/report.html`,
      openAnalyzer: !!process.env.BUNDLE_ANALYZER,
    }),
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
          name(module) {
            let packageName = '';
            if (module.context.indexOf('node_modules') === -1) {
              packageName = 'vendor';
            } else {
              const result = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
              if (result) {
                packageName = `npm-${result[1].replace('@', '')}`;
              }
            }
            return packageName;
          },
        },
      },
    },
  },
};

module.exports = merge(clientConfig(true), clientDevConfig);
