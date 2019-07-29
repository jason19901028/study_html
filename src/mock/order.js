import Mock from 'mockjs'

export default {
  getStatistics: config => {
    function generateArray () {
      let items = []
      let length = Mock.Random.float(0, 10)
      for (let i = 0; i < length; i++) {
        items.push(Mock.Random.float(0, 1000, 2, 2))
      }

      return items
    }

    return Mock.mock({
      result: 0,
      data: {
        businesSstatisticsVO: {
          aliPay: Mock.Random.float(0, 10000, 2, 2),
          bankCodePay: Mock.Random.float(0, 10000, 2, 2),
          cashPay: Mock.Random.float(0, 10000, 2, 2),
          chargeAmount: Mock.Random.float(0, 10000, 2, 2),
          count: Mock.Random.natural(0, 10000),
          discountsAmount: Mock.Random.float(0, 10000, 2, 2),
          enterCount: Mock.Random.natural(0, 10000),
          garageReportBusinessOVOList: generateArray(),
          moneyReceipt: Mock.Random.float(0, 10000, 2, 2),
          otherPay: Mock.Random.float(0, 10000, 2, 2),
          productAmount: Mock.Random.float(0, 10000, 2, 2),
          taskAmount: Mock.Random.float(0, 10000, 2, 2),
          turnover: Mock.Random.float(0, 10000, 2, 2),
          uncollected: Mock.Random.float(0, 10000, 2, 2),
          unitPrice: Mock.Random.float(0, 10000, 2, 2),
          weChatPay: Mock.Random.float(0, 10000, 2, 2)
        },
        entryDeliverReportVO: {
          deliverTotal: Mock.Random.float(0, 10000, 2, 2),
          entryTotal: Mock.Random.float(0, 10000, 2, 2),
          freightTotal: Mock.Random.float(0, 10000, 2, 2),
          productMargin: generateArray(),
          productMarginTotal: Mock.Random.float(0, 10000, 2, 2),
          purchaseTotal: Mock.Random.float(0, 10000, 2, 2),
          salesTotal: Mock.Random.float(0, 10000, 2, 2),
          stockAmount: generateArray(),
          stockTotal: Mock.Random.float(0, 10000, 2, 2)
        },
        monthOrDayTurnoverVO: {
          aliPay: generateArray(),
          amounts: generateArray(),
          bankCodePay: generateArray(),
          cashPay: generateArray(),
          chargeAmount: generateArray(),
          collectedAmout: generateArray(),
          counts: generateArray(),
          discountsAmount: generateArray(),
          earnestAmount: generateArray(),
          otherPay: generateArray(),
          productAmount: generateArray(),
          taskAmount: generateArray(),
          uncollectedAmout: generateArray(),
          unitPrices: generateArray(),
          weChatPay: generateArray(),
          xtags: generateArray()
        }
      },
      desc: Mock.Random.csentence()
    })
  }
}
