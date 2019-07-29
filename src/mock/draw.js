import Mock from 'mockjs'
import { setSessionStorage, getSessionStorage } from 'utils/store'

export default {
  drawing: config => {
    return Mock.mock({
      'result|0-1': 0,
      desc: Mock.Random.csentence()
    })
  },
  drawRecordPage: config => {
    let prizeCount = parseInt(getSessionStorage('prizeCount'))
    prizeCount = isNaN(prizeCount) ? 1 : prizeCount

    let pageNum = 0
    let pageTotal = 10
    let pages = []
    for (let i = 0; i < prizeCount; i++) {
      pages.push({
        address: Mock.mock('@county(true)'),
        createTime: Mock.Random.datetime(),
        flowNum: Mock.mock({
          'regexp': /[0-9]{0,5}/
        }).regexp,
        id: Mock.Random.natural(1000, 2000),
        logisticNum: Mock.mock({
          'regexp': /[0-9]{15}/
        }).regexp,
        name: Mock.Random.cword(1, 5),
        operationName: Mock.Random.cname(),
        phone: Mock.mock({
          'regexp': /1[345789][0-9]{9}/
        }).regexp,
        pointsCount: Mock.Random.natural(10, 200),
        prizeId: Mock.Random.natural(1000, 2000),
        prizeLevel: Mock.Random.natural(0, 7),
        prizeType: Mock.Random.natural(1, 3),
        recordTime: Mock.Random.datetime(),
        status: Mock.Random.natural(0, 2),
        userId: Mock.Random.natural(10000, 20000),
        userName: Mock.Random.cname()
      })
    }

    prizeCount++
    setSessionStorage('prizeCount', prizeCount)

    return Mock.mock({
      result: 0,
      desc: Mock.Random.csentence(),
      data: {
        page: pages,
        totalCount: pages.length,
        pageNum: pageNum,
        pageTotal: pageTotal
      }
    })
  },
  gift: config => {
    return Mock.mock({
      'result|0-1': 0,
      desc: Mock.Random.csentence()
    })
  },
  phoneFee: config => {
    return Mock.mock({
      'result|0-1': 0,
      desc: Mock.Random.csentence()
    })
  },
  giftDetail: config => {
    return Mock.mock({
      result: 0,
      data: {
        address: Mock.mock('@county(true)'),
        createTime: Mock.Random.datetime(),
        flowNum: Mock.mock({
          'regexp': /[0-9]{0,5}/
        }).regexp,
        id: Mock.Random.natural(1000, 2000),
        logisticNum: Mock.mock({
          'regexp': /[0-9]{15}/
        }).regexp,
        name: Mock.Random.cword(1, 5),
        operationName: Mock.Random.cname(),
        phone: Mock.mock({
          'regexp': /1[345789][0-9]{9}/
        }).regexp,
        pointsCount: Mock.Random.natural(10, 200),
        prizeId: Mock.Random.natural(1000, 2000),
        prizeLevel: Mock.Random.natural(0, 7),
        prizeType: Mock.Random.natural(1, 3),
        recordTime: Mock.Random.datetime(),
        status: Mock.Random.natural(0, 2),
        userId: Mock.Random.natural(10000, 20000),
        userName: Mock.Random.cname()
      },
      desc: Mock.Random.csentence()
    })
  }
}
