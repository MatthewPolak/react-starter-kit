const config = require('./package');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  devtool: 'cheap-module-eval-source-map',
  target: 'web',
  mode: 'development',
  entry: {
    app: path.resolve(__dirname,'app/src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /[\\/]node_modules[\\/]/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react', 'stage-1'],
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, 'dist')]),
    new HardSourceWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app/html/index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
}