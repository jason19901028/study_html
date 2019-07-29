import ajax from './axios'
// 查询我的积分流水
export const getMyPoints = params => {
  return ajax.post('/user/user/points/month/list', params)
}

// 查询我的积分概要
export const getMyPointsSummary = params => {
  return ajax.post('/user/user/points/month/count', params)
}

// 查询当月积分，总积分，抽奖次数
// export const monthPointsList = params => {
//   return ajax.post('/user/user/points/month/count', params)
// }

// 查询当月排行
export const pointsRank = params => {
  return ajax.post('/user/user/points/rank', params)
}

// 首页任务完成度
export const taskCompletion = params => {
  return ajax.get('/user/points/task/completion', params)
}
