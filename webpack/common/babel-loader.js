const presets = isServer => [
  ['env',
    {
      modules: false,
      targets: !isServer ? { browsers: ['last 2 versions'] } : {},
    },
  ],
  'react',
  'stage-0',

];

const plugins = isServer => {
  const pluginsArray = [
    'react-css-modules',
    'transform-decorators-legacy',
    'syntax-dynamic-import',
    'transform-class-properties',
    '@loadable/babel-plugin',
    'syntax-class-properties',
    [
      'transform-runtime', {
        polyfill: true,
        regenerator: true,
      },
    ],
  ];

  return pluginsArray;
};

export default isServer => ([
  {
    test: /\.[tj]sx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: presets(isServer),
          plugins: plugins(isServer),
        },
      },
      {
        loader: 'awesome-typescript-loader',
      },
    ],
  },
]);
