import React, { Component } from 'react'

import PropTypes from 'prop-types'

import { createInput } from 'react-nonconformist'

import { validateValueOrRequired } from './text'

import {
  InputGroup,
  Form
} from 'react-bootstrap'

import Cleave from 'cleave.js/react'

import classname from 'classname'

export class CurrencyInputComponent extends Component {
  static propTypes = {
    prepend: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element
    ]),
    onChangeText: PropTypes.func,
    value: PropTypes.any,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    info: PropTypes.string,
    required: PropTypes.bool
  }

  static defaultProps = {
    error: 'Valor inválido'
  }

  _renderInputGroupOrFragment = input => {
    const { prepend } = this.props
    if (prepend) {
      return (
        <InputGroup className='input-group-alternative'>
          <InputGroup.Prepend>
            <InputGroup.Text>{prepend}</InputGroup.Text>
          </InputGroup.Prepend>
          {input}
        </InputGroup>
      )
    }

    return (
      <React.Fragment>{input}</React.Fragment>
    )
  }

  render () {
    const {
      value,
      error,
      onBlur,
      onFocus,
      placeholder,
      label,
      info,
      required,
      onChangeText
    } = this.props

    return (
      <Form.Group>
        {label && <Form.Label>{label}{required && '*'}</Form.Label>}
        {this._renderInputGroupOrFragment(
          <Cleave
            placeholder={placeholder}
            onBlur={onBlur}
            onFocus={onFocus}
            value={value}
            onChange={e => onChangeText(e.target.rawValue.replace('R$ ', ''))}
            type='tel'
            className={classname('form-control', { 'is-invalid': !!error })}
            options={{
              numeral: true,
              numeralDecimalMark: ',',
              delimiter: '.',
              prefix: 'R$ '
            }}
          />
        )}
        {info && <Form.Text className='text-muted'>{info}</Form.Text>}
        {error && (
          <Form.Control.Feedback style={{ display: 'block' }} type='invalid'>
            {error}
          </Form.Control.Feedback>
        )}
      </Form.Group>
    )
  }
}

export default createInput({
  validate: validateValueOrRequired(value => Number(value) > 0),
  inputComponent: CurrencyInputComponent
})
