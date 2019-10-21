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
