<template>
  <div class="chart-h5-wrap">
    <div v-if="!!resData">
      <div class="page-tittle-wrap">
        <img
          @click="confirmClose"
          src="../../assets/images/dealer/backward.png"
          alt=""
        >营业统计
      </div>
      <div class="title-top">
        <div class="section-map">营业额趋势图</div>
        <div class="chart-box">
          <div class="chart-text">
            <span>(单位：元)</span>
            <span>手指移至下方曲线图上，可查看具体时间数据</span>
            <span>

            </span>
          </div>
        </div>
      </div>
      <div class="fill-block"></div>
      <div class="pay">
        <div class="section-title">支付方式统计<i>(元)</i></div>
        <ul>
          <li>
            <span>微信：{{resData.businesSstatisticsVO.weChatPay | money}}</span>
            <span>支付宝：{{resData.businesSstatisticsVO.aliPay | money}}</span>
          </li>
          <li>
            <span>现金：{{resData.businesSstatisticsVO.cashPay | money}}</span>
            <span>银行卡：{{resData.businesSstatisticsVO.bankCodePay | money}}</span>
          </li>
          <li>
            <span>其他：{{resData.businesSstatisticsVO.otherPay | money}}</span>
            <span></span>
          </li>
        </ul>
      </div>
      <div class="fill-block"></div>
      <div class="statistics">
        <div class="section-title">业务分类统计
          <img
            src="../../assets/images/dealer/doubt.png"
            alt=""
            @click="showTip('top')"
          >
          <p class="tip-eg">
            <cube-tip
              ref="tip2"
              :direction="direction"
              :style="tipStyle"
              @close="()=>{}"
              @click="clickHandler"
            >
              <div>需要选择每个配件及工时的业务分类</div>
            </cube-tip>
          </p>
        </div>
        <ul>
          <li>
            <span>分类</span>
            <span>总产值<i>(元)</i></span>
            <span>配件产值<i>(元)</i></span>
            <span>工时产值<i>(元)</i></span>
          </li>
          <li
            v-for="(item , index) in resData.businesSstatisticsVO.garageReportBusinessOVOList"
            :key="index"
          >
            <span>{{item.name}}</span>
            <span>{{item.totalAmount | money}}</span>
            <span>{{item.productAmount | money}}</span>
            <span>{{item.taskAmount | money}}</span>
          </li>
        </ul>
      </div>
      <div class="fill-block block-line"></div>
      <div class="section-box">
        <div
          class="section-title section-to"
          style="padding-left:0;"
        >营业额明细</div>
        <ul class="list-box">
          <li><span>时间</span> <span>营业额<i>(元)</i></span></li>
          <li
            v-for="(item , index) in listChartMoney"
            :key="index"
          ><span>{{resData.monthOrDayTurnoverVO.xtags[listChartMoney.length -1 - index]}}</span> <span>{{item | money}}</span></li>
        </ul>
      </div>
    </div>
    <div
      id="e-chart-reports"
      class="chart"
    ></div>
  </div>
</template>

<script>
import { setSessionStorage } from 'utils/store'
import moment from 'moment'
const ratio = document.body.clientWidth / 750
export default {
  data () {
    return {
      more: false,
      direction: '',
      tipStyle: '',
      eChart: null,
      showBlankChart: true,
      chartsData: [],
      resData: null,
      currentItem: {
        index: 0,
        date: '',
        amount: ''
      },
      listChartMoney: []
    }
  },
  computed: {
    chartOption () {
      return {
        baseOption: {
          animation: true,
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#4081D6',
            textStyle: {
              fontSize: 24 * ratio
            },
            axisPointer: {
              type: 'line'
            },
            // alwaysShowContent: true,
            formatter: this.getToolTipContent,
            hideDelay: 1500,
            position: function (point, params, dom, rect, size) {
              return [point[0] - size.contentSize[0] / 2, 0]
            },
            confine: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [],
            axisPointer: {
              snap: false,
              z: 0,
              lineStyle: {
                color: '#4e4e4e',
                opacity: 1,
                type: 'solid',
                width: 1 * ratio
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
              // interval: 2
            },
            splitNumber: 7,
            axisLabel: {
              margin: 20 * ratio,
              fontSize: 22 * ratio,
              interval: parseInt(this.listChartMoney.length / 4),
              textStyle: {
                color: '#999999'
              }
            },
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            position: 'left',
            splitNumber: 6,
            minInterval: 1,
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dotted',
                color: '#e4e4e4'
              }
            },
            nameLocation: 'middle',
            axisLabel: {
              show: true,
              inside: false,
              margin: 20 * ratio,
              fontSize: 22 * ratio,
              formatter: '{value}\n',
              textStyle: {
                color: '#999999'
              }
            }
          },
          grid: {
            top: 32 * ratio,
            left: 15 * ratio,
            right: 45 * ratio,
            bottom: '5%',
            containLabel: true
          },
          series: [{
            type: 'line',
            showSymbol: true,
            symbol: 'emptyCircle',
            symbolSize: 16 * ratio,
            itemStyle: {
              normal: {
                color: '#4081D6'
              }
            },
            areaStyle: {
              normal: {
                color: 'rgba(64, 129, 214, 0.11)'
              }
            },
            data: []
          }]
        },
        media: [{
          query: {
            maxWidth: 360
          },
          option: {
            xAxis: {
              axisLabel: {
                fontSize: 20 * ratio
              }
            },
            yAxis: {
              axisLabel: {
                fontSize: 22 * ratio
              }
            }
          }
        },
        {
          option: {
            xAxis: {
              axisLabel: {
                fontSize: 22 * ratio
              }
            },
            yAxis: {
              axisLabel: {
                fontSize: 22 * ratio
              }
            }
          }
        }
        ]
      }
    }
  },
  props: {
    detailData: {
      type: Object,
      default: {}
    },
    chartType: {
      type: String,
      default: ''
    }
  },
  methods: {
    confirmClose () {
      this.$emit('chart-close')
    },
    showTip (direction) {
      this.direction = direction
      this.$refs.tip2.show()
      switch (direction) {
        case 'top':
          this.tipStyle = 'left: 12px; top: 34px;'
          break
        case 'bottom':
          this.tipStyle = 'left: 3%; top: -50px;'
          break
        case 'left':
          this.tipStyle = 'left: 200px; top: -10px;'
          break
        case 'right':
          this.tipStyle = 'left: 2px; top: -10px;'
          break
      }
    },
    clickHandler () {
      console.log('click tip area')
    },
    formatDate (time, format = 'MM-DD') {
      console.log(time)
      if (parseInt(this.chartType) === 5) {
        format = 'YYYY-MM'
      }
      let date = moment(new Date(time)).format(format)
      return (date === 'Invalid date') ? '' : date
    },
    formatDay (date) {
      let format = 'MM-DD'
      return this.formatDate(date, format)
    },
    formatMonth (month) {
      return this.formatDate(month, 'MM-DD')
    },
    initData () {
      let token = this.$route.query['token']
      setSessionStorage('token', token)
    },
    handleActivateZr (params) {
      let pointInPixel = [params.offsetX, params.offsetY]
      if (!this.eChart.containPixel('grid', pointInPixel)) {
        return
      }

      let xIndex = this.eChart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0]

      this.eChart.dispatchAction({ type: 'hideTip' })
      this.chartOption.baseOption.series[0].data[this.currentItem.index].symbol = 'emptyCircle'
      this.currentItem = {
        index: xIndex,
        date: this.chartsData[xIndex].date,
        amount: this.chartsData[xIndex].money
      }

      this.chartOption.baseOption.series[0].data[xIndex].symbol = 'circle'
      this.eChart.setOption(this.chartOption)
    },
    handleActivate (params) {
      this.eChart.dispatchAction({ type: 'hideTip' })
      let xIndex = params.dataIndex
      this.chartOption.baseOption.series[0].data[this.currentItem.index].symbol = 'emptyCircle'
      this.currentItem = {
        index: xIndex,
        date: this.chartsData[xIndex].date,
        amount: this.chartsData[xIndex].money
      }

      this.chartOption.baseOption.series[0].data[xIndex].symbol = 'circle'
      this.eChart.setOption(this.chartOption)
    },
    getToolTipContent (params, ticket, callback) {
      // return this.currentItem.date
      return '<div style="text-align: left">' + this.currentItem.date + '<br/>营业额: ￥' + this.currentItem.amount + '</div>'
    },
    initChart () {
      this.eChart = this.$echarts.init(document.getElementById('e-chart-reports'))
      window.addEventListener('resize', () => {
        this.eChart.resize()
      })
    },
    updateChart () {
      let fakeChartMoney = this.chartType === '1' ? [0, 0, 0, 0, 0, 0, 0] : [0, 0, 0, 0, 0, 0]

      this.chartsData = []

      this.resData = Object.assign({}, this.detailData)
      let chartTime = this.resData.monthOrDayTurnoverVO.xtags
      let chartMoney = this.resData.monthOrDayTurnoverVO.amounts
      this.listChartMoney = Array.from(this.resData.monthOrDayTurnoverVO.amounts || []).reverse()

      for (let i = 0; i < chartMoney.length; i++) {
        this.showBlankChart &= chartMoney[i] === 0
      }

      this.showBlankChart = false

      chartMoney = this.showBlankChart ? fakeChartMoney : chartMoney
      for (let j = 0; j < chartMoney.length; j++) {
        this.chartsData.push({
          date: this.showBlankChart ? '0' : chartTime[j],
          money: chartMoney[j].toFixed(2)
        })
      }

      this.chartOption.baseOption.xAxis.data = []
      this.chartOption.baseOption.series[0].data = []
      let index = this.chartsData.length - 1
      for (let k = 0; k < this.chartsData.length; k++) {
        this.chartOption.baseOption.xAxis.data.push(this.chartsData[k].date)
        this.chartOption.baseOption.series[0].data.push({ value: this.chartsData[k].money, symbol: 'emptyCircle' })
      }

      this.currentItem = {
        index: index,
        date: this.chartsData[index].date,
        amount: this.chartsData[index].money
      }
      this.eChart.setOption(this.chartOption)
    }
  },
  mounted () {
    console.log('detailData=', this.detailData)
    if (this.initData) {
      this.initData()
    }

    this.initChart()
    this.updateChart()

    this.eChart.on('click', this.handleActivate)
    this.eChart.getZr().on('click', this.handleActivateZr)
    this.eChart.getZr().on('mousemove', this.handleActivateZr)
  }
}
</script>
<style lang="scss" scoped>
@import "~styles/index";
.title-top {
  padding-top: px2rem(100px);
}
.business-box {
  z-index: 9999;
  background: #fff;
  width: px2rem(750px);
  height: auto;
  position: absolute;
  top: px2rem(-90px);
  left: px2rem(-30px);
}
.statistics {
  font-size: px2rem(28px);
  li {
    display: flex;
    justify-content: space-between;
    color: rgba(54, 54, 54, 1);
    height: px2rem(50px);
    line-height: px2rem(50px);
    padding: 0 px2rem(30px);
    font-size: px2rem(28px);
  }
  li:nth-child(odd) {
    background: rgba(240, 240, 240, 1);
  }
  span {
    text-align: left;
    width: 25%;
    i {
      color: #999;
      font-style: normal;
    }
  }
}
.pay {
  font-size: px2rem(28px);
  padding-bottom: px2rem(20px);
  i {
    font-style: normal;
    color: rgba(153, 153, 153, 1);
  }
  li {
    display: flex;
    align-content: flex-start;
    padding: 0 px2rem(30px);
    color: rgba(54, 54, 54, 1);
    text-align: left;
    padding-bottom: px2rem(15px);
  }
  span {
    padding-right: px2rem(54px);
    width: 45%;
  }
}
.chart-box {
  width: px2rem(720px);
  display: inline-block;
  height: px2rem(636px);
  .chart-text {
    font-size: px2rem(20px);
    color: rgba(153, 153, 153, 1);
    padding: px2rem(28px) px2rem(30px);
    display: flex;
    justify-content: space-between;
  }
}
.chart {
  position: absolute;
  top: px2rem(256px);
  left: px2rem(0px);
  width: px2rem(720px);
}
.chart-h5-wrap {
  min-height: 100%;
  background: #fff;
  text-align: center;
  color: #363636;
  font-size: px2rem(28px);
  .section-map {
    height: px2rem(90px);
    line-height: px2rem(90px);
    font-size: px2rem(32px);
    text-align: left;
    font-weight: bold;
    font-size: px2rem(28px);
    position: relative;
    border-bottom: 1px solid rgba(228, 228, 228, 1);
    display: inline-block;
    margin: 0 px2rem(15px);
    overflow: hidden;
    width: 90%;
    i {
      font-style: normal;
    }
  }

  .section-title {
    height: px2rem(90px);
    line-height: px2rem(90px);
    font-size: px2rem(32px);
    text-align: left;
    padding-left: px2rem(30px);
    font-weight: bold;
    font-size: px2rem(28px);
    position: relative;
    img {
      width: px2rem(34px);
      height: px2rem(34px);
      position: absolute;
      top: px2rem(30px);
      left: px2rem(220px);
    }
    i {
      font-style: normal;
    }
  }
  .section-to {
    margin-top: px2rem(20px);
    height: px2rem(40px) !important;
    line-height: px2rem(40px) !important;
  }
  .list-box li {
    height: px2rem(90px);
    display: flex;
    justify-content: space-between;
    padding-right: px2rem(30px);
    line-height: px2rem(90px);
    border-bottom: px2rem(1px) solid rgba(228, 228, 228, 0.7);
    color: rgba(54, 54, 54, 1);
    span:nth-child(2) {
      text-align: left;
      width: 20%;
      i {
        font-style: normal;
        color: rgba(153, 153, 153, 1);
        font-size: px2rem(28px);
      }
    }
    &:nth-child(2) {
      color: #4081d6;
    }
  }
}

.page-tittle-wrap {
  height: px2rem(90px);
  line-height: px2rem(90px);
  font-size: px2rem(32px);
  box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.15);
  position: fixed;
  width: 100%;
  z-index: 99999;
  background: #fff;
  img {
    width: px2rem(42px);
    height: px2rem(30px);
    left: px2rem(30px);
    top: px2rem(30px);
    position: absolute;
  }
}

.chart-tab {
  border-bottom: solid 1px #e4e4e4;
  margin-top: px2rem(90px);

  .active {
    border-bottom: solid px2rem(4px) #4081d6;
  }

  &-item {
    width: 22%;
    height: px2rem(88px);
    line-height: px2rem(88px);
    vertical-align: middle;
    display: inline-block;
    box-sizing: border-box;
    text-align: center;
    font-size: px2rem(28px);
    color: #363636;
    cursor: pointer;

    &:first-child {
      margin-left: px2rem(-16px);
    }

    &:last-child {
      margin-right: px2rem(-16px);
    }
  }

  @media screen and (max-width: 360px) {
    &-item {
      font-size: px2rem(26px);
    }
  }
}
.page-tittle {
  font-size: px2rem(36px);
  height: px2rem(100px);
  line-height: px2rem(100px);
}
.section-box {
  width: px2rem(720);
  margin-left: px2rem(30px);
}
.fill-block {
  height: px2rem(20px);
  background: rgba(240, 240, 240, 1);
}
.block-line{
  border-bottom: px2rem(1px) solid rgba(228,228,228,0.7);
}
.chart-body {
  text-align: center;
  font-size: px2rem(24px);
  text-align: left;
  .section {
    min-height: 20px;
    width: px2rem(720);
    margin-left: px2rem(30px);
    ul {
      padding: px2rem(30px) 0 px2rem(15px) 0;
      li {
        padding-bottom: px2rem(15px);
      }
    }
  }
  // .chart-title {
  //   height: px2rem(90px);
  //   line-height: px2rem(90px);
  //   font-size: px2rem(24px);
  //   border-bottom: px2rem(1px) solid rgba(228, 228, 228, 1);
  //   display: flex;
  //   align-items: flex-start;
  //   position: relative;
  //   img {
  //     width: px2rem(34px);
  //     height: px2rem(34px);
  //     margin-top: px2rem(30px);
  //   }
  //   h1 {
  //     font-size: px2rem(28px);
  //     color: rgba(64, 129, 214, 1);
  //     padding: 0 px2rem(15px);
  //   }
  //   span {
  //     position: absolute;
  //     right: px2rem(10px);
  //     top: px2rem(10px);
  //     color: rgba(153, 153, 153, 1);
  //   }
  // }
}
.summary {
  margin-top: px2rem(66px);

  span {
    display: inline-block;
    width: 100%;

    &:first-child {
      color: #757575;
      font-size: px2rem(24px);
      margin-bottom: px2rem(15px);
    }

    &:nth-child(2) {
      font-size: px2rem(64px);
      color: #fc4c5a;
      margin-bottom: px2rem(40px);

      &:before {
        content: "\00A5"; /* ￥符号 */
        margin-right: px2rem(8px);
        font-size: px2rem(45px);
      }
    }
  }
}

#e-chart-reports {
  width: 100%;
  min-height: px2rem(550px);
}
</style>
