module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ["*"]
    },
  },
  //   postcssOptions: {
  //     plugins: [
  //       //
  //       require('postcss-px2rem')({
  //         // 根标签字号大小根据设计稿宽度/flexible.js里的份数得到，这里假定设计稿宽度为3840 3840/24 = 160px
  //         remUnit: 80
  //       }),

  //     ]
  //   }
}



