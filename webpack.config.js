module.exports = {
  entry: './src/main.js',
  devtool: 'source-map',
  devServer: {
    inline: true,
    port: 3333,
  },
  output: {
    path: './',
    filename: 'index.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: ['babel'],
      query: {
        presets: ['es2015', 'react'],
      },
    }],
  },
}
