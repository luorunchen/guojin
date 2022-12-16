const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: (config) => {

    config.module
      .rule('vue')
      .test(/\.vue$/)
      .use('style-vw-loader')
      .loader('style-vw-loader')
      .options({
        viewportWidth: 1920,//传参
        // viewportHeight: 1441,//传参
      })

    config.resolve.alias
      .set("@$", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("layout", resolve("src/layout"))
      .set("base", resolve("src/base"))
      .set("static", resolve("src/static"));

  },

  devServer: {
    proxy: 'http://119.91.156.5',
    // proxy: 'http://10.165.165.70:8080',

    // port: 8080, // 端口号配置
    // host: '127.0.0.1',
    // proxy: {
    //   '/api': {
    //     target: 'http://119.91.156.5',// 要跨域的域名
    //     changeOrigin: true, // 是否开启跨域
    //     pathRewrite: {
    //       '^/api': '' // 在请求的时候 凡是/api开头的地址都可以跨域
    //     }
    //   },
    // }

  },



  lintOnSave: false,
  configureWebpack: {
    externals: {
      'AMap': 'AMap' // 高德地图配置
    },
    //防止页面刷新丢失
    devServer: {
      historyApiFallback: true
    },
  },
  // css: {
  //   loaderOptions: {
  //     css: {},
  //     postcss: {
  //       postcssOptions: {
  //         plugins: [
  //           require('postcss-pxtorem')({//这里是配置项，详见官方文档
  //             rootValue: 192, // 换算的基数
  //             // selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
  //             propList: ['*'],
  //           }),

  //         ],
  //       }


  //     },

  //   }
  // },
  // css: {
  //   loaderOptions: {

  //     css: {},
  //     postcss: {
  //       postcssOptions: {
  //         plugins: [
  //           require('postcss-px2rem')({
  //             remUnit: 192//列如设计稿尺寸为320
  //           })
  //         ],
  //       }


  //     }
  //   }
  // },
  lintOnSave: false,
  publicPath: './',
  outputDir: 'guojin',
  assetsDir: 'static',
  productionSourceMap: false

};
