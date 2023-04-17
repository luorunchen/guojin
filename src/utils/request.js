import axios from 'axios';
import qs from "qs";
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: '/gjsafe', // api的base_url
  timeout: 50000 // 请求超时时间
});
const map = axios.create({
  // baseURL: '/gjsafe', // api的base_url
  timeout: 50000 // 请求超时时间
});
const service2 = axios.create({
  // baseURL: '/api2/earlyWarn', // api的base_url
  timeout: 50000 // 请求超时时间
});

// 2.请求拦截器
service.interceptors.request.use(config => {
  // console.log(config, 999);
  if (config.method == 'post') {
    config.data = qs.stringify(config.data)
  }
  let name = sessionStorage.getItem('loginType') == '3' ? 'token' : 'token-user'
  //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
  // config.data = JSON.stringify(config.data); //数据转化,也可以使用qs转换
  // console.log(config)
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded', //配置请求头

  }
  config.headers[name] = sessionStorage.getItem('satoken')
  //注意使用token的时候需要引入cookie方法或者用本地localStorage等方法，推荐js-cookie
  // const token = getCookie('名称');//这里取token之前，你肯定需要先拿到token,存一下
  // if (token) {
  //   config.params = { 'token': token } //如果要求携带在参数中
  //   config.headers.token = token; //如果要求携带在请求头中
  // }
  return config
}, error => {
  Promise.reject(error)
})

service.interceptors.response.use(req => {
  let type = sessionStorage.getItem('loginType')
  // console.log(req.data.code, 22223333);
  if (req.data.code == 401) {
    // alert('该账户在其他地方登录,请重新登录')
    ElMessage({
      message: req.data.msg,
      type: 'error',
      showClose: true
    })
    window.location.href = type != 4 ? "/#/login" : "/#/backstage";
    return

  }
  if (req.data.code == 403) {
    // alert('该账户在其他地方登录,请重新登录')
    ElMessage({
      message: req.data.msg,
      type: 'error',
      showClose: true
    })
    // window.location.href = "/#/login";
    return

  }
  if (req.data.code == 404) {
    // alert('该账户在其他地方登录,请重新登录')
    ElMessage({
      message: "请稍后重试或联系管理员",
      type: 'error',
      showClose: true
    })
    // window.location.href = "/#/login";
    return

  }
  if (req.data.code == 500) {
    // alert('该账户在其他地方登录,请重新登录')
    ElMessage({
      message: req.data.msg,
      type: 'error',
      showClose: true
    })
    // window.location.href = "/#/login";
    return

  }
  return req
}, err => {
  console.log(err);
});
// // 3.响应拦截器
// service.interceptors.response.use(response => {
//   //接收到响应数据并成功后的一些共有的处理，关闭loading等

//   return response
// }, error => {
//   /***** 接收到异常响应的处理开始 *****/
//   if (error && error.response) {
//     // 1.公共错误处理
//     // 2.根据响应码具体处理
//     switch (error.response.status) {
//       case 400:
//         error.message = '错误请求'
//         break;
//       case 401:
//         error.message = '未授权，请重新登录'
//         break;
//       case 403:
//         error.message = '拒绝访问'
//         break;
//       case 404:
//         error.message = '请求错误,未找到该资源'
//         window.location.href = "/NotFound"
//         break;
//       case 405:
//         error.message = '请求方法未允许'
//         break;
//       case 408:
//         error.message = '请求超时'
//         break;
//       case 500:
//         error.message = '服务器端出错'
//         break;
//       case 501:
//         error.message = '网络未实现'
//         break;
//       case 502:
//         error.message = '网络错误'
//         break;
//       case 503:
//         error.message = '服务不可用'
//         break;
//       case 504:
//         error.message = '网络超时'
//         break;
//       case 505:
//         error.message = 'http版本不支持该请求'
//         break;
//       default:
//         error.message = `连接错误${error.response.status}`
//     }
//   } else {
//     // 超时处理
//     if (JSON.stringify(error).includes('timeout')) {
//       Message.error('服务器响应超时，请刷新当前页')
//     }
//     error.message('连接服务器失败')
//   }

//   Message.error(error.message)
//   /***** 处理结束 *****/
//   //如果不需要错误处理，以上的处理过程都可省略
//   return Promise.resolve(error.response)
// })

export { service, map, service2 }