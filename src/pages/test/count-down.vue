<!--
    Description 倒计时 
    @authors Benny
    @date    2018-12-28 14:32:14
    @version 1.0.0
-->
<template>
  <span v-if="type=='bg' && timeObj">
    <!-- <div class="text-fz32 text-white end-time">{{timeObj && timeObj.hours}}</div> -->
    <!-- <span class="text-fz36 text-999">:</span> -->
    <div class="text-fz32 text-white end-time">{{timeObj &&timeObj.minutes}}</div>
    <span class="text-fz36 text-999">:</span>
    <div class="text-fz32 text-white end-time">{{timeObj &&timeObj.seconds}}</div>
  </span>
  <span
    v-else
    class="text-blue"
  >
    {{timeObj && timeObj.toString()}}
  </span>
</template>
<style lang="scss" scoped>
@import "~styles/index.scss";
.end-time {
  display: inline-block;
  width: 0.8rem;
  height: 0.44rem;
  line-height: 0.44rem;
  border-radius: 0.08rem;
}
</style>
<script>
import moment from 'moment'
export default {
  props: {
    // beginDate: {
    //   type: String,
    // },
    // 展示类型
    type: {
      type: String,
      default: 'default'
    },
    // 默认不显示天数
    isShowDays: {
      type: Boolean,
      default: false
    },
    // 结束日期
    endDate: {
      type: String,
      default: ''
    },
    // 结束分钟
    minutes: {
      type: String,
      default: 0
    }
  },
  data () {
    return {
      timeObj: null,
      timer: null
    }
  },
  created () {
  },
  mounted () {
    // 当前本地日期
    let currentDate = moment().format('YYYY-MM-DD HH:mm:ss')
    this.timeObj = this.calcDate(currentDate, this.endDate)
    this.countDown()
  },
  methods: {

    /**
     * @description 计算日期时间差
     * @param beginDate 开始日期
     * @param endDate 结束日期
     * @return {Object} 日期对象
     */
    calcDate (beginDate, endDate) {
      // let endTime = moment(endDate)
      let endTime = moment(beginDate).add(this.minutes, 'minutes')
      let beginTime = moment(beginDate)
      console.log('beginTime=', beginTime)
      const diff = endTime.diff(beginTime)
      const diffDuration = moment.duration(diff)
      if (diff <= 0) {
        return {
          diff: 0, // 时间戳
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          toString: function () {
            // let m = this.minutes <10 ? `0${this.minutes}` :this.minutes;
            // let s = this.seconds <10 ? `0${this.seconds}` :this.seconds;
            // let d = this.days > 1 ? `${this.days}days`: `${this.days}day`;
            return '00:00:00'
          }
        }
      }
      let self = this
      let m = {
        diff: diff, // 时间戳
        days: `${parseInt(diffDuration.asDays(), 10)}`,
        hours: `${parseInt(diffDuration.asHours(), 10)}`,
        minutes: `${(parseInt(diffDuration.asMinutes()) % 60)}`,
        seconds: `${parseInt(diffDuration.asSeconds()) % 60}`,
        toString: function () {
          // let m = this.minutes <10 ? `0${this.minutes}` :this.minutes;
          // let s = this.seconds <10 ? `0${this.seconds}` :this.seconds;
          // let d = this.days > 1 ? `${this.days}days`: `${this.days}day`;
          return self.isShowDays ? `${this.days} ${this.hours}:${this.minutes}:${this.seconds}` : `${this.hours}:${this.minutes}:${this.seconds}`
        }
      }
      // console.log(`
      // ${diffDuration.years()} months
      // ${diffDuration.months()} months
      // ${diffDuration.days()} days
      // ${diffDuration.hours()} hours
      // ${diffDuration.minutes()} minutes∂
      // ${diffDuration.seconds()} seconds left!`);
      return m
    },
    /**
    * @description 倒计时 天时分秒 计算
    * @param unix 时间戳
    */
    formatTime (unix) {
      var t = null
      var d = null
      var h = null
      var m = null
      var s = null
      // js默认时间戳为毫秒,需要转化成秒
      t = unix / 1000
      // d = Math.floor(t / (24 * 3600));
      d = this.isShowDays ? Math.floor(t / (24 * 3600)) : 0
      h = Math.floor((t - 24 * 3600 * d) / 3600)
      m = Math.floor((t - 24 * 3600 * d - h * 3600) / 60)
      s = Math.floor((t - 24 * 3600 * d - h * 3600 - m * 60))
      h = h < 10 ? `0${h}` : `${h}`
      m = m < 10 ? `0${m}` : `${m}`
      s = s < 10 ? `0${s}` : `${s}`
      d = d > 1 ? `${d}days` : `${d}day`
      return { d, h, m, s }
    },
    /**
    * @description 倒计时
    */
    countDown () {
      let timer = setInterval(() => {
        this.timeObj.diff -= 1000
        let obj = this.formatTime(this.timeObj.diff)
        this.timeObj.days = obj.d
        this.timeObj.hours = obj.h
        this.timeObj.minutes = obj.m
        this.timeObj.seconds = obj.s
        if (this.timeObj.diff <= 0) clearInterval(timer)
      }, 1000)
    }
  }
}
</script>
