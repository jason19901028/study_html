import ajax from './axios'
// 根据Id查询门店信息
export const storeInformation = id => {
  return ajax.get(`/user/${id}/garageDetail`)
}

// 立即参与按钮
export const dealerCheck = params => {
  return ajax.post('/user/garage/invite/dealer/register', params)
}

// 发送验证码
export const dealerCode = params => {
  return ajax.post('/user/garage/invite/dealer/code', params)
}

// 邀请记录
export const dealerList = params => {
  return ajax.get('/user/garage/invite/dealer/record?pageNum=1&pageSize=50', params)
}

// 图形验证码
export const getDealerImageCode = phone => {
  return ajax.get(`/user/garage/invite/dealer/refresh/img/code?phone=${phone}`)
}

// 月营业额图表
export const getDelalerPerformance = params => {
  return ajax.post('/order/service/report/statistics', params)
}

// 查询门店库存管理状态
export const getStockStatus = params => {
  return ajax.get('/user/garage/stock/manage/status', params)
}
