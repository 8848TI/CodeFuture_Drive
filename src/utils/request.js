// 引入axios
import axios from 'axios'
import { useUserStore } from '@/stores'
import { useCommonStore } from '@/stores/module/common'

const request = axios.create({
  timeout: 5000,
  baseURL: 'http://127.0.0.1:3007'
  // baseURL: 'http://47.119.133.111:3007'
  // baseURL: '/api'
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const userStore = useUserStore()
  const commonStore = useCommonStore()
  // 开启加载动画
  commonStore.setLoading(true)
  // 携带token
  if (userStore.token) {
    config.headers.Authorization = userStore.token
  }
  return config
}, function (error) {
  const commonStore = useCommonStore()
  // 关闭加载动画
  commonStore.setLoading(false)
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  const commonStore = useCommonStore()
  // 关闭加载动画
  commonStore.setLoading(false)
  // 对响应数据做点什么
  return response
}, function (error) {
  const commonStore = useCommonStore()
  // 关闭加载动画
  commonStore.setLoading(false)
  // 对响应错误做些什么
  return Promise.reject(error)
})

export default request