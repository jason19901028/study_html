import ajax from './axios'
// 保存
export const preservation = params => {
  return ajax.post('/user/referral/create', params)
}

// 注册获取验证码
export const getSendVCode = params => {
  return ajax.post('/user/referral/sendVCode', params)
}

// 根据Id查询门店信息
export const storeInformation = id => {
  return ajax.get(`/user/${id}/garageDetail`)
}
