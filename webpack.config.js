var path = require('path');
var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');

var publicPath = path.resolve(__dirname, 'public');
var assetsPath = path.resolve(__dirname, 'resources/assets');
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  // Don't attempt to continue if there are any errors
  bail: isProduction,
  // Generate sourcemaps in production only
  devtool: isProduction ? 'source-map' : false,
  entry: {
    app: path.join(assetsPath, 'index.js')
  },
  output: {
    filename: isProduction ? 'js/[name].[chunkhash:8].js' : 'js/[name].js',
    path: publicPath,
    publicPath: '/'
  },
  module: {
    rules: [
      // Disabled for now because I cannot make it works with (file|url)-loader
      // {
      //   enforce: 'pre',
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //   options: {
      //     cache: !isProduction,
      //     failOnError: !isProduction
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: !isProduction
        }
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: isProduction
            ? 'media/[name].[hash:8].[ext]'
            : 'media/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g)$/,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              name: isProduction
                ? 'media/[name].[hash:8].[ext]'
                : 'media/[name].[ext]',
              limit: 10000
            }
          },
          {
            loader: 'img-loader',
            options: {
              enabled: isProduction
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['public/js', 'public/media', 'public/css']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        // only package from `node_modules` directory
        return module.context && module.context.indexOf('node_modules') !== 1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new ManifestPlugin({
      fileName: 'mix-manifest.json',
      basePath: '/'
    }),
    new BrowserSyncPlugin({
      online: false,
      notify: false,
      host: 'localhost',
      port: 3000,
      files: [
        'resources/views/**/*.php',
        'public/js/**/*.js',
        'public/css/**/*.css'
      ],
      proxy: process.platform === 'darwin'
        ? 'http://plugboard.dev'
        : 'http://localhost:8000'
    })
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  performance: {
    // Disable performance hints in development mode
    hints: isProduction ? 'warning' : false
  }
};
