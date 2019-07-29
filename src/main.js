import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
// import './mock'
import VueRouter from 'vue-router'
import store from './store'
import Vuex from 'vuex'
import routes from './router'
import echarts from 'echarts'
// import Cube from 'cube-ui'
import VueAwesomeSwiper from 'vue-awesome-swiper'
// import ElementUI from 'element-ui'
import iView from 'iview';
import 'iview/dist/styles/iview.css'
// import 'element-ui/lib/theme-chalk/index.css'
import 'swiper/dist/css/swiper.css'
// import {
//   /* eslint-disable no-unused-vars */
//   Style,
//   // basic
//   Button,
//   Loading,
//   Tip,
//   Toolbar,
//   // form
//   Checkbox,
//   CheckboxGroup,
//   Radio,
//   Checker,
//   Input,
//   Textarea,
//   Select,
//   Switch,
//   Rate,
//   Validator,
//   Upload,
//   Form,
//   // popup
//   Popup,
//   Toast,
//   Picker,
//   CascadePicker,
//   DatePicker,
//   TimePicker,
//   SegmentPicker,
//   Dialog,
//   ActionSheet,
//   Drawer,
//   // scroll
//   Scroll,
//   Slide,
//   IndexList,
//   Swipe
// } from 'cube-ui'



import filters from 'utils/filter'
// import './assets/theme/index.scss'
import '@/assets/iconfont/iconfont.css'
import './utils/remote-script'
import { getToken, setToken } from '@/utils/auth'

// import { getSessionStorage, setSessionStorage } from 'utils/store'
// import { getSessionStorage } from 'utils/store'
// import axios from 'axios'
// let request = axios.create({
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })

// request.get(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx11f2de2564988f9c&redirect_uri=http://craou.cn&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`).then((res) => {
//   console.log('request===', res)
// })



// let local = window.location.href
// let codes = null
// // console.log('code=', codes)
// // console.log('local=', local)
// if (codes === null || codes === '') {
//   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb7d09a052984168c&redirect_uri=${encodeURIComponent('http://admin.craou.cn')}&response_type=code&scope=snsapi_base&state=1#wechat_redirect`
//   let getUrlParam = (name) => {
//     let reg = new RegExp('(^|&)' + name + '=([^&*])(&|$)')
//     let r = window.location.search.substr(1).match(reg)
//     if (r !== null) {
//       return unescape(r[2])
//     }
//     return null
//   }
//   let code = getUrlParam('code')
//   let search = window.location.search
//   // console.log(searwindow.location)
//   console.log('window.location=', window.location)
//   console.log('code=======', code);
//   // alert('window.location.href===', window)
//   if (code) {
//     setToken(code)
//   }
// } else {
//   setToken('')
// }
// import { getCookie, setCookie } from './utils/store'
// import { Table, TableColumn, Slider, Input } from 'element-ui'

// Vue.component(Table.name, Table)
// Vue.component(TableColumn.name, TableColumn)
// Vue.component(Slider.name, Slider)
// Vue.use(Input)

Vue.prototype.$echarts = echarts
Vue.prototype.$eventBus = new Vue()
Vue.use(filters)
Vue.use(VueRouter)
Vue.use(Vuex)
// Vue.use(Cube)
// Vue.use(Dialog)
// Vue.use(ElementUI)
Vue.use(iView)
Vue.use(VueAwesomeSwiper)
const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.online) {
    // const toast = this.$createToast({
    //   txt: `网络已断开，请稍候再试......`,
    //   type: 'error',
    //   time: 2000
    // })
    // toast.show()
    // return
  }
  let token = getToken()
  // console.log('token=', token)
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    // console.log('token2=', token)
    // console.log('!token=', !token)
    if (token) {
      console.log('are you ok?=', token == 'undefined')
    }
    if (!token) {
      console.log(1)
      next({
        path: '/404'
        // query: { redirect: to.fullPath }
      })
    } else {
      console.log(2)
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
  // document.title = to.meta.title || to.name
  // if (from.path !== '/dc/home' && to.path === '/dc/download') {
  //   next()
  // } else if (!to.meta.skipAuth) {
  //   let token = getSessionStorage('token')
  //   if (!token) {
  // token = from.query.token
  // setSessionStorage('token', token)
  //   }
  //   if (!token) {
  //     token = getCookie('token')
  //     setSessionStorage('token', token)
  //   } else {
  //     setCookie('token', token, 1)
  //   }
  //   if (!token) {
  //     next({
  //       path: '/404'
  //     })
  //   } else {
  //     next()
  //   }
  // } else {
  //   next()
  // }
})

router.afterEach((to) => {
  // window._hmt.push(['_trackPageview', to.path])
})

// 如果断网跳转到错误页面
window.addEventListener('offline', function () {
  store.commit('UPDATE_ONLINE', false)
})
window.addEventListener('online', function () {
  store.commit('UPDATE_ONLINE', true)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
