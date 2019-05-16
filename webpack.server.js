const path = require("path");
const SRC_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'build');

const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const webpackNodeExternals = require('webpack-node-externals');

const config =  {
    target: 'node',

    entry: SRC_DIR + '\\ServerApp\\index.jsx', 
    
    output: {
        path: BUILD_DIR,
        filename: 'serverbundle.js'
      },
      //ignore express server in the bundle
      externals: [webpackNodeExternals()]

};

module.exports = merge(baseConfig, config);
