import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'
// 创建axios实例， 将来对创建出来的实例，进行自定义配置
// 好处：不会污染原始的axios实例
const instance = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 自定义加载图标
  Toast.loading({
    message: '加载中...',
    forbidClick: true, // 禁止背景点击
    loadingType: 'spinner',
    duration: 0 // 永不消失
  })
  // 如果有token就在请求时携带，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么(默认axios会多包装一层data，需要需要拦截器中处理一下)
  const res = response.data
  if (res.status !== 200) {
    // Toast默认是单例模式，后面的toast调用了会把前面的覆盖
    Toast(res.message)
    return Promise.reject(res.message)
  } else {
    // 正确情况
    Toast.clear()
  }
  return res
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
