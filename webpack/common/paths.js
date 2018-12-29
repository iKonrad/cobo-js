const path = require('path');

// ----------------------

// Parent folder = project root
const root = path.join(__dirname, '../..');
module.exports = {
  root,
  src: path.join(root, 'src'),
  client: path.join(root, 'src', 'client'),
  static: path.join(root, 'static'),
  dist: path.join(root, 'dist'),
  public: path.join(root, 'dist', 'public'),
  exported: path.join(root, 'exported'),
  js: path.join(root, 'dist', 'public', 'js'),
  css: path.join(root, 'dist', 'public', 'css'),
  server: path.join(root, 'src', 'server'),
  webpack: path.join(root, 'webpack'),
  scss: path.join(root, 'src', 'client', 'scss'),
  containers: path.join(root, 'src', 'client', 'containers'),
  routes: path.join(root, 'src', 'client', 'routes'),
  state: path.join(root, 'src', 'client', 'state'),
  sagas: path.join(root, 'src', 'client', 'sagas'),
  utils: path.join(root, 'src', 'client', 'utils'),
  settings: path.join(root, 'settings'),
  components: path.join(root, 'src', 'client', 'components'),
  types: path.join(root, 'src', 'client', 'types'),
  templates: path.join(root, 'src', 'client', 'templates'),
};
