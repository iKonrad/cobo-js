const PATHS = require('./paths');



module.exports = {
  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      { test: /\.tsx?$/, use: [{ loader: 'awesome-typescript-loader' }] },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          babelrc: false,
          presets: [
            ['env',
              {
                modules: false,
                targets: { browsers: ['last 2 versions'] },
              },
            ],
            'react',
            'stage-0',
          ],
          plugins: [
            'react-css-modules',
            'transform-decorators-legacy',
            'syntax-dynamic-import',
            'react-loadable/babel',
            'transform-class-properties',
            'syntax-class-properties',
            ['transform-imports', {
              reactstrap: {
                transform: 'reactstrap/lib/${member}',
                preventFullImport: true,
              },
              lodash: {
                transform: 'lodash/${member}',
                preventFullImport: true,
              },
            }],
          ],
        },
      },
    ],
  },
  resolve: {
    alias: PATHS,
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  // Turn off some obstructing logs
  stats: {
    entrypoints: false,
    children: false,
  },
  // Disable "file too large" messages
  performance: {
    hints: false,
  },
};
