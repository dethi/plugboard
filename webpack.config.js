var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');


var assetsPath = path.resolve(__dirname, 'resources/assets');

module.exports = {
  entry: {
    app: path.join(assetsPath, 'js/index.js'),
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'public/js')
  },
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/,
        loader: ['babel-loader', 'eslint-loader']
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // only package from `node_modules` directory
        return module.context && module.context.indexOf('node_modules') !== 1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new ManifestPlugin({
      fileName: 'mix-manifest.json',
      basePath: '/js/'
    })
  ]
}