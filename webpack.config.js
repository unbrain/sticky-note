const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/app/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public/js')
  }
};