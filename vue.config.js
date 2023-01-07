const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/su': {
        target: 'http://suggestion.baidu.com', //后端接口地址
        changeOrigin: true, //是否允许跨越
        pathRewrite: {
          '^/su': '/su', //重写,
        },
      },
    },
  },
})
