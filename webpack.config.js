const path = require('path');

module.exports = {
  context: __dirname,
  entry: "./frontend/legolas.jsx",
  output: {
    path: path.resolve(__dirname, 'app', 'assets', 'javascripts'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react'],
            plugins: ["emotion"]
          }
        },
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[hash]-[name].[ext]',
            publicPath: 'images/',
            outputPath: '../../../public/images/'
          }
        }]
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    extensions: [".js", ".jsx", "*"]
  }
};
