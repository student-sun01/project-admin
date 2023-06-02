const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint校验
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:7788/", //目标地址 请求的后台接口
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          //路径重写
          "^/api": "",
        },
      },
    },
  },
});
