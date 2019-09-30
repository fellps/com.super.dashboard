import { TextInputComponent, validateValueOrRequired } from './text'

import { createInput } from 'react-nonconformist'

export default createInput({
  handleProps: props => ({
    placeholder: 'Sua senha...',
    error: 'A senha tem que ter mais de 4 caracteres.',
    type: 'password',
    ...props
  }),
  validate: validateValueOrRequired(value => String(value || '').length > 4),
  inputComponent: TextInputComponent
})
