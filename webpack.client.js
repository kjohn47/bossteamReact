const path = require("path");
const SRC_DIR = path.resolve(__dirname, 'src');
const APP_DIR = path.resolve(__dirname, 'public');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
//const webpack = require('webpack');
const config =  {
    entry: SRC_DIR + '\\ClientApp\\index.jsx', 
    
    output: {
        path: APP_DIR + '\\javascript\\',
        filename: 'bundle.js',
        publicPath: '/'
      }, 

      devServer: {
          contentBase: path.join(__dirname, 'public'),
          open: true,
          historyApiFallback: true,
          port: 45700
      }/*,
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]*/
};

module.exports = merge(baseConfig, config);
