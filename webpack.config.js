var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public/js');
var APP_DIR = path.resolve(__dirname, 'src/js');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        include : APP_DIR,
        loader : 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};

module.exports = config;
