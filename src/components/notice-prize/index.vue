<template>
  <div>
    <div id="notice-prize" class="notice-prize" ref="notice">
      <div class="activePrize" id="activePrize">
        <ul>
          <li :style="liStyle" class="notice-li" v-for="(prize, index) in noticeList" :key="index">恭喜 {{prize.userPhone&&(prize.userPhone.substr(0,3))}}****{{prize.userPhone&&(prize.userPhone.substr(7))}},
           抽中<i :style="iStyle">{{prize.prizeLevel | prizeLevel}}{{prize.name}}</i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { drawRecordPage } from 'api/draw'
export default {
  props: {
    color: {
      type: Object,
      default: function () {
        return {
          li: '#000',
          i: '#FC4C5A'
        }
      }
    }
  },
  data () {
    return {
      noticeList: [],
      len: 0,
      liStyle: {
        color: this.color.li
      },
      iStyle: {
        color: this.color.i
      },
      winningPrize: 0,
      timer: 0
    }
  },
  watch: {
    winningPrize (val, old) {
      if (val !== old) {
        // 中奖后重新去调取抽奖记录方法前先清除定时器
        clearInterval(this.timer)
        this.getGiftList()
      }
    }
  },
  mounted () {
    this.getGiftList()
  },
  methods: {
    getGiftList () {
      let pagestr = `?pageNum=${1}&pageSize=${100}`
      drawRecordPage({}, pagestr).then(res => {
        if (res.data.result !== 0) {
          return
        }
        this.noticeList = res.data.data.page || []
        let len = this.noticeList.length
        let width = window.screen.width - 130
        let activePrize = document.getElementById('activePrize')
        activePrize.style.width = (len * width + len * 40 - 10) + 'px'
        let activePrizeMargin = activePrize.style.marginLeft
        let timeRun = () => {
          this.timer = setInterval(function () {
            if (parseInt(activePrize.style.width) + parseInt(activePrize.style.left) === 0) {
              activePrize.style.left = 0
              activePrizeMargin = 0
            } else {
              activePrizeMargin--
              activePrize.style.left = activePrizeMargin + 'px'
            }
          }, 20)
        }
        timeRun()
      })
    }
  }
}
</script>
<style scoped lang="scss">
@import "~styles/index.scss";
.notice-prize {
  position: Relative;
  margin: 0 auto;
  // width: px2rem(465px);
  height: px2rem(70px);
  overflow: hidden;
  #activePrize {
    position: absolute;
    left: 0;
    top: 0;
    ul {
      padding: 0;
    }
    li {
      height: px2rem(70px);
      line-height: px2rem(70px);
      text-indent: 5px;
      text-align: center;
      float: left;
      margin: 0 px2rem(20px);
      i {
        font-style: normal;
      }
    }
    li:first-child {
      margin-left: 0;
    }
  }
}
</style>
