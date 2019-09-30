import request from './index'
import qs from 'qs'

export const login = async ({ cpf, password }) => request.post('/auth/login', qs.stringify({
  cpf: cpf.replace(/[^0-9]/gi, ''), password
}))

export const forgotPassword = async ({ cpf }) => request.post('/auth/solicitar-codigo-senha', qs.stringify({
  cpf: cpf.replace(/[^0-9]/gi, '')
}))

export const updatePassword = async ({ cpf, codigo, senha }) => request.post('/auth/recuperar-senha', qs.stringify({
  cpf: cpf.replace(/[^0-9]/gi, ''),
  codigo: codigo.replace(/[^0-9]/gi, ''),
  senha
}))
