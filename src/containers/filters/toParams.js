
export default function toParams (params) {
  return Object.keys(params).reduce((acc, key) => {
    if (key === 'eventName') return { ...acc, nome: params[key] }
    if (key === 'userName') return { ...acc, nome: params[key] }
    if (key === 'CPF') return { ...acc, cpf: params[key].replace(/[^0-9]/gi, '') }
    return { ...acc, [key]: params[key] }
  }, {})
}
