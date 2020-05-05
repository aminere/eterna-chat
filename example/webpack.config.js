const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist'
  },
  resolve: {
    extensions: ['.ts']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [
          path.resolve(__dirname, 'src')
        ]
      }
    ]
  }
};
