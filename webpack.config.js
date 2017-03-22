var path = require('path');

var assetsPath = path.resolve(__dirname, 'resources/assets');

module.exports = {
  entry: path.join(assetsPath, 'js/index.js'),
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/js')
  }
}