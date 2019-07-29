import axios from 'axios'
import Vue from 'vue'
import Cube from 'cube-ui'
// import store from '../store'
import { getSessionStorage, getCookie } from 'utils/store'
Vue.use(Cube)
let ajax = axios.create({
  // baseURL: process.env.API_SERVER_URL,
  // baseURL: 'http://192.168.3.9',
  baseURL: 'http://47.100.112.48:8081',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60 * 1000
})
// const vueObj = new Vue()
// 拦截请求
ajax.interceptors.request.use((config) => {
  console.log('config=', config)
  // if (!store.state.online) {
  //   const toast = vueObj.$createToast({
  //     txt: '网络已断，请稍候再试......',
  //     type: 'error',
  //     time: 2000
  //   })
  //   toast.show()
  // }
  config.headers.token = getSessionStorage('token') || getCookie('token')
  return config
}, error => {
  return Promise.reject(error)
})

// 拦截响应
ajax.interceptors.response.use(response => {
  return response
}, error => {
  return error.response
})

export default ajax
