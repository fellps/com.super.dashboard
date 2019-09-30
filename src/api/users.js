import request, { loggedUser } from './index'

export const get = async ({ uuid: userId, ...restParams } = {}) => {
  const { uuid, token } = loggedUser()
  return request.get(`/usuarios/${uuid}/usuarios/${userId || ''}`, {
    params: restParams,
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const save = async ({ uuid: userId, ...restData }) => {
  const { uuid, token } = loggedUser()
  return request.put(`/usuarios/${uuid}/usuarios/${userId}`, restData, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const getAddress = async () => {

}
