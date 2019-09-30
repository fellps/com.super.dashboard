import { TextInputComponent, validateValueOrRequired } from './text'

import { createInput } from 'react-nonconformist'

import { CPF } from 'cpf_cnpj'

export default createInput({
  handleProps: props => ({
    placeholder: 'Seu CPF...',
    ...props,
    error: 'CPF Inválido',
    type: 'tel',
    mask: '999.999.999-99'
  }),
  validate: validateValueOrRequired(value => CPF.isValid(value || '')),
  inputComponent: TextInputComponent
})
