module.exports = (isDev) => { // 根据不同环境生成不同的配置
  return {
    preserveWhitespace: true, // 去除空格
    miniCssExtract: !isDev,
    cssModules: {
      localIdentName: '[path]-[name]-[hash:base64:8]',
      camelCase: true // 驼峰式命名
    }
  }
}
