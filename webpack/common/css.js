const paths = require('./paths');

const css = isProduction => {
  const config = {
    // CSS loader configuration -- plain CSS, SASS and LESS
    rules: [
      {
        ext: 'css',
        use: [
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              modules: true,
              namedExport: true,
            },
          },
        ],
      },
      {
        ext: 's(c|a)ss',
        use: [
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],

    // Defaults to use with `css-loader` in all environments
    loaderDefaults: {
      // No need to minimize-- CSSNano already did it for us
      minimize: false,

      // Format for 'localised' CSS modules
      localIdentName: isProduction ? '[hash:base64:7]' : '[local]-[hash:base64:4]',

      // Retain the loader pipeline
      importLoaders: 1,
    },

    // Return an array containing the module RegExp and css-loader config,
    // based on the original file extension
    getModuleRegExp(ext) {
      return [
        [`^(?!.*\\.global\\.${ext}$).*\\.${ext}$`, { modules: true }],
        [`\\.global\\.${ext}$`, { modules: false }],
      ];
    },

    getDevLoaders(extractCSS, sourceMap = false) {
      return (function* loadCss() {
        for (const loader of config.rules) {
          // Iterate over CSS/SASS/LESS and yield local and global mod configs
          for (const mod of config.getModuleRegExp(loader.ext)) {
            yield {
              test: new RegExp(mod[0]),
              use: [
                {
                  loader: extractCSS,
                  options: {
                    publicPath: '../',
                  },
                },
                {
                  loader: 'css-loader',
                  query: Object.assign({}, config.loaderDefaults, {
                    // Use sourcemaps in development
                    sourceMap,
                  }, mod[1]),
                },
                ...loader.use,
              ],
            };
          }
        }
      }());
    },

    getProdLoaders(extractCSS) {
      return (function* loadCss() {
        for (const loader of config.rules) {
          // Iterate over CSS/SASS/LESS and yield local and global mod configs
          for (const mod of config.getModuleRegExp(loader.ext)) {
            yield {
              test: new RegExp(mod[0]),
              use: [
                {
                  loader: extractCSS,
                  options: {
                    publicPath: '../',
                  },
                },
                {
                  loader: 'css-loader',
                  query: Object.assign({}, config.loaderDefaults, {
                    // Use sourcemaps in development
                    sourceMap: false,
                  }, mod[1]),
                },
                ...loader.use,
              ],
            };
          }
        }
      }());
    },

    //   for (const mod of config.getModuleRegExp(loader.ext)) {
    //   yield {
    //     test: new RegExp(mod[0]),
    //     use: [
    //       {
    //         loader: 'css-loader/locals',
    //         options: {
    //           modules: true,
    //           localIdentName: '[path][name]__[local]--[hash:base64:5]',
    //           getLocalIdent: (context, localIdentName, localName, options) => {
    //             return 'something' + Math.random();
    //           }
    //         }
    //       },
    //       ...loader.use,
    //     ],
    //   };
    // }
    //
    getExtractCSSLoaders() {
      return (function* loadCss() {
        for (const loader of config.rules) {
          // Iterate over CSS/SASS/LESS and yield local and global mod configs
          for (const mod of config.getModuleRegExp(loader.ext)) {
            yield {
              test: new RegExp(mod[0]),
              use: [
                {
                  loader: 'css-loader/locals',
                  options: {
                    // Format for 'localised' CSS modules
                    localIdentName: isProduction ? '[hash:base64:7]' : '[local]-[hash:base64:4]',
                    modules: true,
                  },
                },
                ...loader.use,
              ],
            };
          }
        }
      }());
    },
  };
  return config;
};

module.exports = css;
