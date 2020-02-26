import React, { useState } from 'react'

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

import {
  Row,
  Col,
  Modal
} from 'react-bootstrap'

import useMount from '../../helpers/useMount'

import { useDispatch, useSelector } from 'react-redux'

import { getOne, clearUser, set, save } from './actions'

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)
  const response = useSelector(state => state.users.response)
  const transactions = useSelector(state => state.users.transactions)
  const isLoading = useSelector(state => state.isLoading[getOne])

  return {
    user,
    response,
    transactions,
    getOne: params => dispatch(getOne(params)),
    set: params => dispatch(set(params)),
    save: params => dispatch(save(params)),
    clearUser: () => dispatch(clearUser()),
    isLoading
  }
}

export default function UserView ({ history, match }) {
  const [showSuccess, setShowSuccess] = useState(0)

  const {
    user,
    response,
    getOne,
    save,
    set,
    clearUser,
    isLoading
  } = useStateAndDispatch()

  useMount(() => {
    getOne({ _id: match.params.uuid })
    return clearUser
  })

  const submit = async () => {
    const data = {
      ...user,
      birthdate: '',
      cpf: String(user.cpf).replace(/[^0-9]/gi, ''),
      phone: String(user.phone).replace(/[^0-9]/gi, '')
    }
    await save(data)
    setShowSuccess(true)
  }

  const handleClose = () => setShowSuccess(false)

  return (
    <Dashboard title='Ver Usuário'>
      <Row>
        <Col
          md={12} sm={12}
        >
          <Card
            isLoading={isLoading}
            header={<h3 className='mb-0'>Perfil</h3>}
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
                  <TextInput {...connect('name')} label='Nome Completo' required />
                  <CPFInput {...connect('cpf')} label='CPF' disabled required />
                  <TextInput {...connect('email')} label='Email' required />
                  <PhoneInput {...connect('phone')} />
                  <PasswordInput {...connect('password')} label='Redefinir senha' />
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
      <Modal show={showSuccess} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Atualização realizada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Atualização realizada com sucesso!
        </Modal.Body>
        <Modal.Footer>
          <Button variant='success' onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </Dashboard>
  )
}
