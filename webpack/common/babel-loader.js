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


const loadableBabel = function ({ types: t, template }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        const source = path.node.source.value;
        if (source !== 'react-loadable') return;

        const defaultSpecifier = path.get('specifiers').find(specifier => specifier.isImportDefaultSpecifier());

        if (!defaultSpecifier) return;

        const bindingName = defaultSpecifier.node.local.name;
        const binding = path.scope.getBinding(bindingName);

        binding.referencePaths.forEach(refPath => {
          let callExpression = refPath.parentPath;

          if (
            callExpression.isMemberExpression()
            && callExpression.node.computed === false
            && callExpression.get('property').isIdentifier({ name: 'Map' })
          ) {
            callExpression = callExpression.parentPath;
          }

          if (!callExpression.isCallExpression()) return;

          const args = callExpression.get('arguments');
          if (args.length !== 1) throw callExpression.error;

          const options = args[0];
          if (!options.isObjectExpression()) return;

          const properties = options.get('properties');
          const propertiesMap = {};

          properties.forEach(property => {
            const key = property.get('key');
            propertiesMap[key.node.name] = property;
          });

          if (propertiesMap.webpack) {
            return;
          }

          const loaderMethod = propertiesMap.loader.get('value');
          const dynamicImports = [];

          loaderMethod.traverse({
            Import(path) {
              dynamicImports.push(path.parentPath);
            },
          });

          if (!dynamicImports.length) return;

          propertiesMap.loader.insertAfter(
            t.objectProperty(
              t.identifier('webpack'),
              t.arrowFunctionExpression(
                [],
                t.arrayExpression(
                  dynamicImports.map(dynamicImport => t.callExpression(
                    t.memberExpression(
                      t.identifier('require'),
                      t.identifier('resolveWeak'),
                    ),
                    [dynamicImport.get('arguments')[0].node],
                  )),
                ),
              ),
            ),
          );

          propertiesMap.loader.insertAfter(
            t.objectProperty(
              t.identifier('modules'),
              t.arrayExpression(
                dynamicImports.map(dynamicImport => dynamicImport.get('arguments')[0].node),
              ),
            ),
          );
        });
      },
    },
  };
};

const plugins = isServer => {
  const pluginsArray = [
    'react-css-modules',
    'transform-decorators-legacy',
    'syntax-dynamic-import',
    'transform-class-properties',
    loadableBabel,
    'syntax-class-properties',
    [
      'transform-runtime', {
      polyfill: true,
      regenerator: true,
    },
    ],
  ];

  // if (isServer) {
  //   plugins.push(loadableBabel);
  // }

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
