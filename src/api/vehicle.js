import ajax from './axios'

// 车辆列表
export const vehicleList = params => {
  return ajax.get('/user/car/wx/list', params)
}
