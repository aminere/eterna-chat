const path = require('path');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'EternaChat'    
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
          path.resolve(__dirname, '../src')
        ]
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  }
};
