const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  entry: path.resolve(__dirname, './src/index.js'), // 入口js文件
  output: { // webpack打包输出js文件的路径及文件名
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: process.env.NODE_ENV || 'production', // 判断其环境
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
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
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HtmlWebpackPlugin(),
    new MiniCssExtractPlugin({ // 提取分离css
      filename: isDev ? '[name].css' : '[name].[chunkHash:8].css'
    })
  ]
}

if (isDev) {
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      'style-loader',
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          // 只在开发中启用热点
          hmr: isDev,
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
  })
  config.devServer = {
    port: 8000,
    host: '0.0.0.0', // 方便本机、内网、手机等访问
    overlay: {
      errors: true
    }
  }
} else {
  config.entry = {
    app: path.resolve(__dirname, './src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = 'bundle.[chunkHash:8].js'
  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          hmr: isDev,
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
  })
  config.optimization = {
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
}

module.exports = config
