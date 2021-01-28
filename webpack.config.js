const path = require('path');

module.exports = {
  entry: './client/src/main.js',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist')
  }
};