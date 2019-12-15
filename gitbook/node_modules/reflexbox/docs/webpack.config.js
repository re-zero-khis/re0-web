
module.exports = {
  entry: {
    bundle: [
      './docs/entry'
    ]
  },

  output: {
    path: __dirname,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.md$/,
        exclude: /node_modules/,
        loader: 'html!markdown'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },

  devServer: {
    contentBase: 'docs'
  }
}

