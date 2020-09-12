import axios from 'axios'
import Vue from 'vue'
import router from './router/index'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api',
  timeout: 5000
})

// 请求拦截器
http.interceptors.request.use(config => {
  if(sessionStorage.token) config.headers.Authorization = 'Bearer ' + sessionStorage.token
  return config
})

// 响应拦截器
http.interceptors.response.use(res => {
  return res
}, err => {
  err.response.status !== 401 && Vue.prototype.$message.error(err.response.data)
  // 未登录重定向为登陆页
  if(err.response.status === 401) {
    router.replace('/login')
  }
  return Promise.reject(err)
})

export default http
