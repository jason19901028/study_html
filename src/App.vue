<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable */
import { setToken, getTag, getVideo } from '@/utils/auth'
import { studentAuth, studentInfo } from 'api/study'
export default {
  name: 'app',
  data () {
    return {
      screenWidth: 0,
      code: '',
      state: '',
      studentId: null,
    }
  },
  components: {
  },
  mounted () {
    // setToken('')=
    if (!window.localStorage.getItem('openId')) { // 如果缓存localStorage中没有微信openId，则需用code去后台获取
      this.getCode()
      // alert('code=', this.code)
    } else {
      // 别的业务逻辑
    }
    // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb7d09a052984168c&redirect_uri=${encodeURIComponent('http://admin.craou.cn')}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`

    this.screenWidth = document.documentElement.clientWidth || document.body.clientWidth

    window.addEventListener('resize', () => {
      let width = document.documentElement.clientWidth || document.body.clientWidth
      if (width === this.screenWidth) {
        return
      }

      window.location.reload()
    })

    // 获取视窗宽度
    let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
    // 设置根html font-size
    let htmlDom = document.getElementsByTagName('html')[0]
    htmlDom.style.fontSize = htmlWidth / 10 + 'px'
  },
  methods: {
    getCode () { // 非静默授权，第一次有弹框
      // var local = window.location.href // 获取页面url
      var local = 'http://wap.kaoya.vip'
      var appid = 'wxb7d09a052984168c'
      // this.getUrlCode() // 截取code
      this.code = this.getUrlCode().code
      this.state = this.getUrlCode().state
      console.log('this.getUrlCode()=', this.getUrlCode())
      // this.code = '021juekA1V0wed0QqcjA1OU3kA1juekb'
      let state = window.localStorage.getItem('state') || ''
      console.log('state=', state)
      // if (this.state && !this.code && state) {
      //   this.$router.push('/404')
      //   return
      // }
      if (!this.code) { // 如果没有code，则去请求
        window.localStorage.setItem('state', '123')
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      } else {
        // this.getStudentAuth(this.code)
        setToken(this.code)
        let videoId = getVideo()
        setTimeout(() => {
          if (getTag() === 'video') {
            // debugger
            this.$router.push({ name: '课程详情', query: { id: videoId, tag: getTag(), code: this.code } })
            this.$eventBus.$emit('video-detail', { id: videoId, tag: getTag(), code: this.code })
          }
        }, 500)
        if (getTag === 'exam') {
          setTimeout(() => {
            this.$router.push({ name: '测试', query: { tag: getTag(), code: this.code } })
            this.$eventBus.$emit('exam-detail', { tag: getTag(), code: this.code })
          }, 500)
        }
        if (getTag()) {
          return
        }
        // this.getStudentInfo()
        this.getStudentAuth(this.code)

        // alert('code===', this.code)
        // console.log('localStorage=', JSON.parse(window.localStorage.getItem('student')))
        // this.code = JSON.parse(window.localStorage.getItem('code'))
        // alert('student=', '8888')
        console.log('this.code===111', this.code)
        window.localStorage.setItem('code', this.code)
        // this.$router.push({ name: '首页' })
      }
    },
    getUrlCode () { // 截取url中的code方法
      var url = location.search
      this.winUrl = url
      var theRequest = new Object()
      if (url.indexOf("?") != -1) {
        var str = url.substr(1)
        var strs = str.split("&")
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1])
        }
      }
      // window.localStorage.setItem('code', JSON.stringify(window.location))
      return theRequest
    },
    getStudentAuth (code) {
      new Promise((resolve) => {
        studentAuth(code).then((res) => {
          console.log('auth===', res)
          // window.localStorage.setItem('student', JSON.stringify(res.data.data.student))
          this.studentId = res.data.data.student.id
          window.localStorage.setItem('studentId', this.studentId)
          if (this.studentId) {
            resolve(true)
          }
        })
      }).then((result) => {
        if (result) {
          this.getStudentInfo()
        }
      })
    },
    getStudentInfo () {
      studentInfo(this.studentId).then((res) => {
        console.log('studentInfo=', res)
      })
    }
  }
}

</script>

<style>
html {
  font-family: Arial, Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, SimHei, sans-serif;
}

body,
ul,
li {
  padding: 0;
  list-style: none;
  margin: 0;
}

body.modal-open {
  position: fixed;
  width: 100%;
}
</style>
