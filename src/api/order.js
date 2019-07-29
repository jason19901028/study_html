import ajax from './axios'
// 工单详情页
export const orderDetail = id => {
  return ajax.get(`/order/owner/service/${id}/detail?type=1`)
}

// 门店详情
export const garageDetail = params => {
  return ajax.post(`/user/garage/getGarageDetail`, params)
}

// 安检详情
export const securityDetail = params => {
  return ajax.get(`/order/car/detecting/project/check/report/${params.id}`)
}
