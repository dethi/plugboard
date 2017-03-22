var path = require('path');
var webpack = require('webpack');

var assetsPath = path.resolve(__dirname, 'resources/assets');

module.exports = {
  entry: {
    app: path.join(assetsPath, 'js/index.js'),
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'public/js')
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
    })
  ]
}