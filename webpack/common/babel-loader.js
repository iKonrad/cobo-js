export default isServer => ({
  test: /\.jsx?$/,
  loader: 'babel-loader',
  exclude: /node_modules/,
  options: {
    babelrc: false,
    presets: [
      ['env',
        {
          modules: false,
          targets: isServer ? 'node' : { browsers: ['last 2 versions'] },
        },
      ],
      'react',
      'stage-0',
    ],
    plugins: [
      'react-css-modules',
      'transform-decorators-legacy',
      [
        'transform-runtime', {
          polyfill: true,
          regenerator: true,
        },
      ],
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
});
