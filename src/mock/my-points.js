import Mock from 'mockjs'

export default {
  getMyPointsSummary: config => {
    return Mock.mock({
      result: 0,
      data: {
        totalPoints: Mock.Random.natural(0, 50000),
        historyPoints: Mock.Random.natural(0, 50000),
        seasonPoints: 0,
        prizeCount: 0,
        availablePrize: 0
      },
      desc: Mock.Random.csentence()
    })
  },
  getMyPoints: config => {
    let {
      seasonId
    } = JSON.parse(config.body)

    let pointOptions = [
      {
        instructions: '离合器',
        type: 2,
        points: 30
      },
      {
        instructions: '雨刮器',
        type: 2,
        points: 10
      },
      {
        instructions: '离合器',
        type: 1,
        points: 30
      },
      {
        instructions: '润滑油',
        type: 2,
        points: 40
      },
      {
        instructions: '刹车片',
        type: 2,
        points: 30
      },
      {
        instructions: '开"工单"',
        type: 0,
        points: 30
      },
      {
        instructions: '邀请好友',
        type: 0,
        points: 450
      },
      {
        instructions: '分享好友',
        type: 0,
        points: 30
      },
      {
        instructions: '加入大大汽修',
        type: 0,
        points: 100
      }
    ]

    let flows = []
    let len = 10
    for (let j = 0; j < len; j++) {
      if (seasonId !== null && seasonId >= 0 && j !== parseInt(seasonId)) {
        continue
      }

      let flow = {}

      flow.seasonId = j
      flow.codePoints = Mock.Random.natural(0, 10000)
      flow.lotteryPoints = Mock.Random.natural(0, 3000)
      flow.taskPoints = Mock.Random.natural(0, 1000)
      flow.totalPoints = flow.codePoints + flow.lotteryPoints + flow.taskPoints

      let items = []
      let length = Mock.Random.natural(0, 100)
      for (let i = 0; i < length; i++) {
        let index = Mock.Random.natural(0, 8)
        items.push(Mock.mock({
          instructions: pointOptions[index].instructions,
          type: pointOptions[index].type,
          points: pointOptions[index].points,
          createTime: Mock.Random.datetime('yyyy-MM-dd HH:mm:ss')
        }))
      }
      flow.pointsList = items
      if (j < len - 1) {
        flows.push(flow)
      } else {
        flows.unshift(flow)
      }
    }

    return Mock.mock({
      result: 0,
      data: flows,
      desc: Mock.Random.csentence()
    })
  }
}
