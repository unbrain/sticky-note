const webpack = require('webpack')
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/app/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public/js')
  },
  module: {
    rules: [{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader']
    }]
  },
  resolve: {
    alias: {
      jquery: path.join(__dirname, "./src/js/libs/jquery-2.0.3.min.js"),
      mod: path.join(__dirname, "./src/js/mod"),
      less: path.join(__dirname, "./src/less/")
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    }),
  ]
};