const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  //devServer config
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    hot:true,
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://api.zhuishushenqi.com",
        pathRewrite: {"^/api": ""}
      },
      "/cpi": {
        target: "http://novel.juhe.im/chapters",
        pathRewrite: {"^/cpi": ""}
      }
    }
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
})