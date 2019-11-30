const presets = isServer => [
  ['@babel/env',
    {
      modules: false,
      targets: !isServer ? { browsers: ['last 2 versions'] } : {},
    },
  ],
  '@babel/react',
];

const plugins = isServer => {
  const pluginsArray = [
    '@babel/plugin-proposal-class-properties',
    [
      '@babel/plugin-proposal-decorators', {
        legacy: true,
      },
    ],
    '@loadable/babel-plugin',
    '@babel/plugin-syntax-class-properties',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-transform-modules-commonjs',
    [
      '@babel/plugin-transform-runtime', {
        corejs: 2,
        regenerator: true,
      },
    ],
  ];

  return pluginsArray;
};

module.exports = isServer => ([
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
