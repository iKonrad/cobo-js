const PATHS = require('./paths');

module.exports = {
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
