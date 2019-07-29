import ajax from './axios'
 // 日营业额图表
export const getPerformanceByDay = params => {
  return ajax.get('/order/service/groupTotalByDay', params)
}

// 月营业额图表
export const getPerformanceByMonth = params => {
  return ajax.get('/order/service/groupTotalByMonth', params)
}
