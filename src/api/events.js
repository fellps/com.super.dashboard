import request, { loggedUser } from './index'
import toFormData from '../helpers/toFormData'

export const get = async ({ uuid: eventId, ...restParams } = {}) => {
  const { token } = loggedUser()
  return request.get(`/events/${eventId || ''}`, {
    params: restParams,
    headers: { 'x-access-token': token }
  })
}

export const save = async ({ _id: eventId, ...restData }) => {
  const { token } = loggedUser()

  const formData = toFormData(restData)

  if (eventId) {
    return request.put(`/events/${eventId || ''}`, formData, {
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  return request.post(`/events/${restData.producerId || ''}`, formData, {
    headers: {
      'x-access-token': token,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const types = async params => {
  const { uuid, token } = loggedUser()
  return request.get(`/usuarios/${uuid}/eventos-tipo`, {
    params,
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const balance = async ({ uuid_evento: uuidEvento, ...restParams }) => {
  const { uuid, token } = loggedUser()
  return request.get(`/usuarios/${uuid}/eventos/${uuidEvento}/saldo`, {
    params: restParams,
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const withdraw = async ({ uuid_evento: uuidEvento, uuid_produtora: uuidProducer, ...restData }) => {
  const { uuid, token } = loggedUser()
  return request.post(
    `/usuarios/${uuid}/eventos/${uuidEvento}/produtoras/${uuidProducer}/saque`,
    restData,
    { headers: { Authorization: `Bearer ${token}` } }
  )
}
