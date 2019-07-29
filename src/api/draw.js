import ajax from './axios'
// 抽奖
export const drawing = params => {
  return ajax.post('/user/jackpot/draw', params)
}
// 抽奖记录分页查询
export const drawRecordPage = (params, pagestr = '') => {
  return ajax.post('/user/user2prize/page' + pagestr, params)
}
// 查询全部奖品列表不分页
export const drawRecordPageList = (params, pagestr = '') => {
  return ajax.post('/user//user2prize/pageList' + pagestr, params)
}
// 根据奖品ID查询
export const giftDetail = params => {
  return ajax.get('/user/user2prize/' + params)
}
// 实物兑换
export const cashGift = params => {
  return ajax.post('/user/ticket/gift', params)
}
// 虚拟物品兑换
export const cashPhoneFee = params => {
  return ajax.post('/user/ticket/phoneFee', params)
}
