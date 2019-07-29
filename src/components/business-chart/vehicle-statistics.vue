<template>
  <div class="chart-h5-wrap">
    <div v-if="!!resData">
      <div class="page-tittle-wrap">
        <img
          @click="confirmClose"
          src="../../assets/images/dealer/backward.png"
          alt=""
        >车辆趋势</div>
      <div class="main-wrap">
        <div class="section-title">进厂台次趋势图</div>
        <div class="chart-box"></div>
      </div>
      <div class="fill-block"></div>
      <div class="section-title">客单价趋势图</div>
    </div>
    <div
      id="e-chart-reports"
      class="chart"
    ></div>
    <div
      id="customer-reports"
      class="chart-customer"
    ></div>
  </div>
</template>

<script>
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
      showBlankCustomerChart: true,
      chartsData: [],
      customerChartsData: [],
      resData: null,
      currentItem: {
        index: 0,
        date: '',
        amount: ''
      },
      currentCustomerItem: {
        index: 0,
        date: '',
        amount: ''
      }
    }
  },
  computed: {
    chartOption () {
      return {
        baseOption: {
          animation: true,
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#FFC598',
            textStyle: {
              fontSize: 24 * ratio
            },
            axisPointer: {
              type: 'line'
            },
            // alwaysShowContent: true,
            hideDelay: 1500,
            formatter: this.getToolTipContent,
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
                color: '#FFAE0A',
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
            },
            splitNumber: 7,
            axisLabel: {
              margin: 20 * ratio,
              fontSize: 22 * ratio,
              interval: parseInt(this.resData.monthOrDayTurnoverVO.xtags.length / 4),
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
                color: '#FFC598'
              }
            },
            areaStyle: {
              normal: {
                color: 'rgba(255,197,152,0.11)'
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
    },
    customerChartOption () {
      return {
        baseOption: {
          animation: true,
          tooltip: {
            trigger: 'axis',
            backgroundColor: '#FFC598',
            textStyle: {
              fontSize: 24 * ratio
            },
            axisPointer: {
              type: 'line'
            },
            hideDelay: 1500,
            formatter: this.getCustomerToolTipContent,
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
                color: '#FFAE0A',
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
            },
            splitNumber: 7,
            axisLabel: {
              margin: 20 * ratio,
              fontSize: 22 * ratio,
              interval: parseInt(this.resData.monthOrDayTurnoverVO.xtags.length / 4),
              show: true,
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
              interval: 0,
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
                color: '#FFC598'
              }
            },
            areaStyle: {
              normal: {
                color: 'rgba(255,197,152,0.11)'
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
    clickHandler () {
      console.log('click tip area')
    },
    formatDate (time, format = 'MM-DD') {
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
    handleActivateCustomer (params) {
      let xIndex = params.dataIndex
      this.customerChartOption.baseOption.series[0].data[this.currentItem.index].symbol = 'emptyCircle'
      this.currentCustomerItem = {
        index: xIndex,
        date: this.customerChartsData[xIndex].date,
        amount: this.customerChartsData[xIndex].money
      }

      this.customerChartOption.baseOption.series[0].data[xIndex].symbol = 'circle'
      this.customerChart.setOption(this.customerChartOption)
    },
    handleActivateZrCustomer (params) {
      let pointInPixel = [params.offsetX, params.offsetY]
      if (!this.customerChart.containPixel('grid', pointInPixel)) return

      let xIndex = this.customerChart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0]

      this.customerChart.dispatchAction({ type: 'hideTip' })
      this.customerChartOption.baseOption.series[0].data[this.currentCustomerItem.index].symbol = 'emptyCircle'
      this.currentCustomerItem = {
        index: xIndex,
        date: this.customerChartsData[xIndex].date,
        amount: this.customerChartsData[xIndex].money
      }
      this.customerChartOption.baseOption.series[0].data[xIndex].symbol = 'circle'
      this.customerChart.setOption(this.customerChartOption)
    },

    getToolTipContent (params, ticket, callback) {
      return '<div style="text-align: left">' + this.currentItem.date + '<br/>进厂台次: ' + this.currentItem.amount + '</div>'
    },
    getCustomerToolTipContent (params, ticket, callback) {
      return '<div style="text-align: left">' + this.currentCustomerItem.date + '<br/>客单价: ￥' + this.currentCustomerItem.amount + '</div>'
    },
    initChart () {
      this.eChart = this.$echarts.init(document.getElementById('e-chart-reports'))
      this.customerChart = this.$echarts.init(document.getElementById('customer-reports'))
      window.addEventListener('resize', () => {
        this.eChart.resize()
        this.customerChart.resize()
      })
    },
    updateChart () {
      let fakeChartMoney = this.chartType === '1' ? [0, 0, 0, 0, 0, 0, 0] : [0, 0, 0, 0, 0, 0]
      this.chartsData = []
      this.customerChartsData = []

      this.resData = Object.assign({}, this.detailData)
      let chartTime = this.resData.monthOrDayTurnoverVO.xtags
      let chartMoney = this.resData.monthOrDayTurnoverVO.counts || []
      let customerChartMoney = Array.from(this.resData.monthOrDayTurnoverVO.unitPrices || [])

      for (let i = 0; i < chartMoney.length; i++) {
        this.showBlankChart &= chartMoney[i] === 0
      }

      this.showBlankChart = false

      chartMoney = this.showBlankChart ? fakeChartMoney : chartMoney
      this.chartsData = chartTime.map((item, j) => {
        return {
          date: this.showBlankChart ? '0' : chartTime[j],
          money: chartMoney[j] || 0
        }
      })

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

      // 客单价数据处理
      for (let i = 0; i < chartMoney.length; i++) {
        this.showBlankCustomerChart &= chartMoney[i] === 0
      }
      this.showBlankCustomerChart = false
      customerChartMoney = this.showBlankCustomerChart ? fakeChartMoney : customerChartMoney
      this.customerChartsData = customerChartMoney.map((item, j) => {
        return {
          date: this.showBlankCustomerChart ? '0' : chartTime[j],
          money: customerChartMoney[j].toFixed(2)
        }
      })

      this.customerChartOption.baseOption.xAxis.data = []
      this.customerChartOption.baseOption.series[0].data = []
      let customerIndex = this.customerChartsData.length - 1
      for (let k = 0; k < this.customerChartsData.length; k++) {
        this.customerChartOption.baseOption.xAxis.data.push(this.customerChartsData[k].date)
        this.customerChartOption.baseOption.series[0].data.push({ value: this.customerChartsData[k].money, symbol: 'emptyCircle' })
      }

      this.currentCustomerItem = {
        index: customerIndex,
        date: this.customerChartsData[customerIndex].date,
        amount: this.customerChartsData[customerIndex].money
      }

      this.eChart.setOption(this.chartOption)
      this.customerChart.setOption(this.customerChartOption)
    }
  },
  mounted () {
    this.initChart()
    this.updateChart()

    // echarts点击及鼠标滑动事件
    this.eChart.on('click', this.handleActivate)
    this.eChart.getZr().on('click', this.handleActivateZr)
    this.eChart.getZr().on('mousemove', this.handleActivateZr)
    this.customerChart.on('', this.handleActivateCustomer)
    this.customerChart.getZr().on('click', this.handleActivateZrCustomer)
    this.customerChart.getZr().on('mousemove', this.handleActivateZrCustomer)
  }
}
</script>
<style lang="scss" scoped>
@import "~styles/index";
.chart-customer {
  width: px2rem(750px);
  height: px2rem(600px);
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
    text-align: center;
  }
}
.pay {
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
    padding-right: px2rem(124px);
  }
}
.chart-box {
  width: px2rem(720px);
  display: inline-block;
  height: px2rem(556px);
  .chart-text {
    font-size: px2rem(20px);
    color: rgba(153, 153, 153, 1);
    padding: px2rem(28px) 0;
    display: flex;
    justify-content: space-between;
  }
}
.chart {
  position: absolute;
  top: px2rem(196px);
  left: px2rem(0px);
  width: px2rem(720px);
}
.chart-h5-wrap {
  min-height: 100%;
  background: #fff;
  text-align: center;
  color: #363636;
  font-size: px2rem(28px);

  .section-title {
    height: px2rem(90px);
    line-height: px2rem(90px);
    font-size: px2rem(32px);
    text-align: left;
    padding-left: px2rem(30px);
    font-weight: bold;
  }
  .list-box li {
    height: px2rem(90px);
    display: flex;
    justify-content: space-between;
    padding: 0 px2rem(30px);
    line-height: px2rem(90px);
    border-bottom: 1px solid rgba(228, 228, 228, 0.7);
    color: rgba(54, 54, 54, 1);
    span:nth-child(2) {
      text-align: left;
    }
  }
}
.main-wrap {
  margin-top: px2rem(90px);
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
  top: 0;
  left: 0;
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
.chart-body {
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
