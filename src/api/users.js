import request, { loggedUser } from './index'
import qs from 'qs'

export const get = async ({ uuid: userId, ...restParams } = {}) => {
  const { _id, token } = loggedUser()
  return request.get(`/users/${_id}`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}

export const save = async ({ uuid: userId, ...restData }) => {
  const { _id, token } = loggedUser()
  return request.put(`/users/${_id}`, qs.stringify(restData), {
    headers: { 'x-access-token': token }
  })
}
