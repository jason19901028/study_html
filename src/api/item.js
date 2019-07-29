import ajax from './axios'

export const getLastMaintenancePlan = params => {
  return ajax.post('/item/maintenance/last/plan', params)
}

export const getMaintenancePlan = () => {
  return ajax.get('/item/maintenance/plan')
}
