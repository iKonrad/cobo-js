const presets = isServer => [
  ['env', {
    modules: false,
    targets: isServer ? 'node' : { browsers: ['last 2 versions'] },
  },
  ],
  'react',
  'stage-0',
];

const plugins = [
  'transform-decorators-legacy',
  'syntax-dynamic-import',
  'react-loadable/babel',
  [
    'transform-runtime', {
      polyfill: true,
      regenerator: true,
    },
  ],
  'react-css-modules',
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
];

export default isServer => ([
  {
    test: /\.tsx?$/,
    use: [
      {
        loader: 'awesome-typescript-loader',
      },
    ],
  },
  {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      babelrc: false,
      presets: presets(isServer),
      plugins,
    },
  }]);
