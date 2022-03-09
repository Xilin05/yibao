const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  //build 时输出的文件目录
  outputDir: "dist",
  // 关闭Eslint语法，提示的错误，将lintOnSave设置为false,
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
  devServer: {
    port: 8080,
    host: "127.0.0.1",
    open: true,
    https: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/api": {
        // target: "https://way.jd.com",
        target: "http://apis.juhe.cn",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/news": {
        target: "https://way.jd.com",
        // target: "http://apis.juhe.cn",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/news": "",
        },
      },
      // "/maps": {
      //   target: "https://apis.map.qq.com",
      //   changeOrigin: true,
      //   ws: true,
      //   pathRewrite: {
      //     "^/maps": "",
      //   },
      // },
    },
  },
  chainWebpack: (config) => {
    // 设置快捷路径， @ 表示 'src' ，components 表示 'src/components'
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"));
  },
};
