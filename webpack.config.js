var HtmlWebpackPlugin     = require('html-webpack-plugin');
var webpack               = require('webpack');
webpack.HtmlWebpackPlugin = require('html-webpack-plugin');
webpack.ExtractTextPlugin = require('extract-text-webpack-plugin');
webpack.CopyWebpackPlugin = require('copy-webpack-plugin');
var childProcess          = require('child_process');
var _                     = require('lodash');

const BUILD_PATH  = 'public/';
const PUBLIC_PATH = '../../';

// Production?
const PRODUCTION  = process.env.NODE_ENV === 'production';

var version       = _.trim(childProcess.execSync('git rev-parse --short HEAD').toString());

var javascriptFilenameFormat  = 'assets/js/[name]' + (PRODUCTION ? '-' + version : '') + '.js';
var stylesheetFilenameFormat  = 'assets/css/[name]' + (PRODUCTION ? '-' + version : '') + '.css';

module.exports = {
  entry: {
    application: [
      'application/entry',
      'ui/sass/application'
    ]
  },
  output: {
    path: BUILD_PATH,
    filename: javascriptFilenameFormat,
    chunkFilename: javascriptFilenameFormat,
    publicPath: PUBLIC_PATH
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.scss'],
    root: [path.join(__dirname, '/')],
    modulesDirectories: ['', 'node_modules']
  },
  plugins: [
    new webpack.ExtractTextPlugin(stylesheetFilenameFormat),
    new webpack.CopyWebpackPlugin([
      { from: 'ui/images/', to: 'assets/images' }
    ]),
    new webpack.optimize.UglifyJsPlugin(
      {
        warning: false,
        mangle: true,
        comments: false
      }
    ),
    new HtmlWebpackPlugin({
      template: './ui/index.html',
      inject: 'body',
      hash: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.jquery': 'jquery'
    })
  ],
  module: {
    loaders: [
      {test: /\.ts(x?)$/, loader: 'ts-loader'},
      {
        test: /\.scss$/,
        loader: webpack.ExtractTextPlugin.extract(
          'style',
          'css!sass'
        )
      },
      {
        test: /\.css$/,
        loader: webpack.ExtractTextPlugin.extract(
          'style',
          'css'
        )
      }, {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw'
      }, {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      }, {
        test: '\.jpg$',
        exclude: /node_modules/,
        loader: 'file'
      }, {
        test: '\.png$',
        exclude: /node_modules/,
        loader: 'url'
      }
    ]
  }
};