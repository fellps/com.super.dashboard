import request, { loggedUser } from './index'
import qs from 'qs'

export const get = async ({ uuid: userId, ...restParams } = {}) => {
  const { token } = loggedUser()
  return request.get(`/users/`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}

export const getOne = async ({ _id: userId, ...restParams } = {}) => {
  const { token } = loggedUser()
  return request.get(`/users/${userId}`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}

export const save = async ({ _id: userId, ...restData }) => {
  const { token } = loggedUser()
  return request.put(`/users/${userId}`, qs.stringify(restData), {
    headers: { 'x-access-token': token }
  })
}

export const create = async ({ ...restData }) => {
  const { token } = loggedUser()
  return request.post(`/users/`, qs.stringify(restData), {
    headers: { 'x-access-token': token }
  })
}

export const getCashiers = async ({ uuid: eventId, ...restParams } = {}) => {
  const { token } = loggedUser()
  return request.get(`/users/cashiers/${eventId || ''}`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}

export const getPOS = async ({ eventId, cashier, ...restParams } = {}) => {
  const { token } = loggedUser()
  return request.get(`/users/pos/${eventId}/${cashier || ''}`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}
