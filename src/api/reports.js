import request, { loggedUser } from './index'

export const totals = async ({ uuid: userId, ...restParams } = {}) => {
  const { uuid, token } = loggedUser()
  return request.get(`/usuarios/${uuid}/transacoes/consolidacoes`, {
    params: restParams,
    headers: { Authorization: `Bearer ${token}` }
  })
}
