import ajax from './axios'
// 注册获取验证码
export const getVcodeToRegistered = params => {
  return ajax.post('/user/garage/sendVcodeToRegistered', params)
}

// 验证验证码
export const checkVcode = params => {
  return ajax.post('/user/garage/checkVCode', params)
}

// 完成注册大大汽修
export const garageRegistered = params => {
  return ajax.post('/user/garage/garageRegistered', params)
}

// 获取userid
export const getUserId = () => {
  return ajax.get('/user/getUserId')
}

// 获取验证码
export const sendVcode = params => {
  return ajax.post('/user/sendVcode', params)
}

// 获取验证码
export const vcodeLogin = params => {
  return ajax.post('/user/vcodeLogin', params)
}

// 获取下载链接
export const downLoadUrl = params => {
  return ajax.post('/user/app/version/getNowAppVersion', params)
}

// 通过code获取用户手机号信息以及用户是否绑定
export const getUserStatusByCode = params => {
  return ajax.post('/user/weChat/owner/login', params)
}

// 大大养车公众号发送短信验证码
export const sendCellPhoneCode = params => {
  return ajax.post('/user/weChat/send/owner/code', params)
}

// 大大养车公众号绑定手机号
export const bindPhone = params => {
  return ajax.post('/user/weChat/owner/bindPhone', params)
}

