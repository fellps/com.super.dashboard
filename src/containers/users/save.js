import React from 'react'

import Dashboard from '../dashboard'

import Card from '../../components/card'
import Button from '../../components/button'
import Alert from '../../components/alert'

import Form from 'react-nonconformist'

import TextInput from '../../components/inputs/text'
import PhoneInput from '../../components/inputs/phone'
import SwitchInput from '../../components/inputs/switch'
import CPFInput from '../../components/inputs/cpf'
import PasswordInput from '../../components/inputs/password'
import DateInput from '../../components/inputs/date'

import {
  Row,
  Col
} from 'react-bootstrap'

import useMount from '../../helpers/useMount'

import { useDispatch, useSelector } from 'react-redux'

import { clearUser, set, create } from './actions'

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)
  const response = useSelector(state => state.users.response)
  const transactions = useSelector(state => state.users.transactions)
  const isLoading = useSelector(state => state.isLoading[create])

  return {
    user,
    response,
    transactions,
    set: params => dispatch(set(params)),
    create: params => dispatch(create(params)),
    clearUser: () => dispatch(clearUser()),
    isLoading
  }
}

export default function UserView ({ history, match }) {
  const {
    user,
    response,
    create,
    set,
    clearUser,
    isLoading
  } = useStateAndDispatch()

  useMount(() => {
    return clearUser
  })

  const submit = async () => {
    const data = {
      ...user,
      birthdate: '',
      cpf: String(user.cpf).replace(/[^0-9]/gi, ''),
      phone: String(user.phone).replace(/[^0-9]/gi, '')
    }
    await create(data)
    history.push('/users')
  }

  return (
    <Dashboard title='Novo Usuário'>
      <Row>
        <Col
          md={12} sm={12}
        >
          <Card
            isLoading={isLoading}
            header={<h3 className='mb-0'>Cadastrar Usuário</h3>}
            shadow
          >
            <Alert variant='danger' show={response.status === 'error'}>
              {response.message}
              <pre>
                {JSON.stringify(response, null, 2)}
              </pre>
            </Alert>
            <Form
              values={user}
              onChange={set}
              onSubmit={submit}
            >
              {(connect, submit) => (
                <form onSubmit={e => {
                  e.preventDefault()
                  submit()
                }}>
                  <SwitchInput {...connect('isEnabled')} label='Ativo' />
                  <TextInput {...connect('name')} label='Nome completo' required />
                  <CPFInput {...connect('cpf')} label='CPF' required />
                  <TextInput {...connect('email')} label='Email' required />
                  <PhoneInput {...connect('phone')} />
                  <PasswordInput {...connect('password')} label='Senha' />
                  <hr />
                  <div style={{ textAlign: 'right' }}>
                    <Button type='submit'>Salvar</Button>
                  </div>
                </form>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
    </Dashboard>
  )
}
