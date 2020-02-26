import { TextInputComponent, validateValueOrRequired } from './text'

import { createInput } from 'react-nonconformist'

export default createInput({
  handleProps: props => ({
    placeholder: 'Sua senha...',
    error: 'A senha precisa possuir pelo menos 6 caracteres.',
    type: 'tel',
    mask: '999999',
    ...props
  }),
  validate: validateValueOrRequired(value => String(value || '').length >= 6),
  inputComponent: TextInputComponent
})
