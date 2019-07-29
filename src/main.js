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



import filters from 'utils/filter'
// import './assets/theme/index.scss'
import '@/assets/iconfont/iconfont.css'
import './utils/remote-script'
import { getToken, setToken } from '@/utils/auth'


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
