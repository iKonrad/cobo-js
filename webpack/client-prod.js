const paths = require('./common/paths');
const webpack = require('webpack');
const createCss = require('./common/css');
const clientConfig = require('./common/client');
const merge = require('webpack-merge');
const Common = require('./common/common');
const createMiniExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const Zopfli = require('zopfli-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const WebpackChunkHash = require('webpack-chunk-hash');
const ManifestPlugin = require('webpack-manifest-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const extractCSS = new createMiniExtractPlugin({
  filename: 'css/style-[chunkhash].css',
  chunkFileName: 'css/[id]-[chunkhash].chunk.css',
});

const css = createCss(true);

const clientDevConfig = {
  // Tell webpack if we're on development or production environment
  mode: 'production',
  module: {
    rules: [
      // CSS loaders
      ...css.getProdLoaders(createMiniExtractPlugin.loader),
    ],
  },
  output: {
    filename: 'js/client-[chunkhash].js',
    chunkFilename: 'js/[name]-[chunkhash].chunk.js',
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
      canPrint: true
    }),

    // Check for errors, and refuse to emit anything with issues
    new webpack.NoEmitOnErrorsPlugin(),

    // Compress assets into .gz files, so that our Koa static handler can
    // serve those instead of the full-sized version
    new Zopfli({
      // Use Zopfli compression
      algorithm: 'zopfli',
      // Overwrite the default 80% compression-- anything is better than
      // nothing
      minRatio: 0.99,
    }),

    // Also generate .br files, with Brotli compression-- often significantly
    // smaller than the gzip equivalent, but not yet universally supported
    new BrotliPlugin({
      // Overwrite the default 80% compression-- anything is better than
      // nothing
      minRatio: 0.99,
    }),

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
      reportFilename: paths.dist + '/report.html',
      openAnalyzer: !!process.env.BUNDLE_ANALYZER,
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 50000,
    }
  }
};

module.exports = merge(clientConfig(true), clientDevConfig);
