const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.2.90:3000', //后端接口地址
        changeOrigin: true, //是否允许跨越
        pathRewrite: {
          '^/api': '/api', //重写,
        },
      },
    },
  },
})
