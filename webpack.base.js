module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
      rules: [
          {
            test: /\.(ts|tsx|js|jsx)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader'
              }
            ],
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          }
        ]
    }
}