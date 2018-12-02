const WebpackBar = require('webpackbar');

const modules = {
  getProgressBar(name = 'Szery', environment = 'development') {
    return new WebpackBar({
      name: name + ' - ' + (environment === 'development' ? 'Development' : 'PRODUCTION'),
    });
  }
}

module.exports = modules;
