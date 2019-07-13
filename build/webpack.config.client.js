const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const devServer = {
  port: 8020,
  host: '0.0.0.0', // 方便本机、内网、手机等访问
  overlay: {
    errors: true
  },
  headers: { 'Access-Control-Allow-Origin': '*' }, // 允许跨域
  historyApiFallback: {
    index: '/index.html'
  }, // 解决Cannot GET /app 等路径找不到问题
  hot: true // 热加载
}

const defaultPlugin = [
  new VueLoaderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // 只在开发中启用热点
                hmr: process.env.NODE_ENV,
                // 如果hmr不起作用，这是一个有力的方法
                reloadAll: true
              }
            },
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    devServer,
    plugins: defaultPlugin.concat([
      new MiniCssExtractPlugin({ // 提取分离css
        filename: '[name].[hash:8].css'
      })
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.resolve(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: 'bundle.[chunkHash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            'vue-style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    plugins: defaultPlugin.concat([
      new MiniCssExtractPlugin({ // 提取分离css
        filename: '[name].[chunkHash:8].css'
      })
    ]),
    optimization: {
      splitChunks: {
        cacheGroups: { // 设置缓存组
          commons: {
            chunks: 'initial',
            minChunks: 2, // 在分割模块之前共享模块的最小块数(默认是1)
            maxInitialRequests: 5, // 入口点上的最大并行请求数(默认是3)
            minSize: 0
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            name: 'vendor',
            priority: 10,
            enforce: true
          }
        }
      },
      runtimeChunk: true
    }
  })
}

module.exports = config
