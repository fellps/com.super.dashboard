import request, { loggedUser } from './index'

export const salesSummary = async ({ uuid: eventId, ...restParams } = {}) => {
  const { token } = loggedUser()
  return request.get(`/reports/financial/sales-summary/${eventId}`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}

export const salesSummaryExternal = async ({ uuid: eventId, ...restParams } = {}) => {
  const { token } = loggedUser()
  return request.get(`/external/reports/financial/sales-summary/${eventId}`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}

export const ordersDelivered = async ({ uuid: eventId, ...restParams } = {}) => {
  const { token } = loggedUser()
  return request.get(`/reports/producer/orders-delivered/${eventId}`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}

export const cashierClosing = async ({ uuid: eventId, cpf, startAt, endAt, ...restParams } = {}) => {
  const { token } = loggedUser()
  return request.get(`/reports/financial/cashier-closing/${eventId}/${cpf}?startAt=${startAt}&endAt=${endAt}`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}
