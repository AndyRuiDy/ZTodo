const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: path.resolve(__dirname, '../client/index.js'), // 入口js文件
  output: { // webpack打包输出js文件的路径及文件名
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, '../dist')
  },
  mode: process.env.NODE_ENV || 'production', // 判断其环境
  module: {
    rules: [
      { // 代码校验
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/transform-runtime']
          }
        }
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[ext]'
            }
          }
        ]
      }
    ]
  }
}

module.exports = config
