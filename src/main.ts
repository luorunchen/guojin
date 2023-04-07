import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
// import 'lib-flexible'
// import 'lib-flexible/flexible'
// import '@/utils/flexible'

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $myGlobalMethod: goEasy
//   }
// }
// getCurrentInstance()?.appContext?.config.globalProperties.$myGlobalFunction =
//   goEasy
const baseSize = 16
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 1920 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 1920
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
createApp(App).use(store).use(router).use(ElementPlus, { locale }).mount('#app')
