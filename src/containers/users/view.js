import React from 'react'

import Dashboard from '../dashboard'

import Card from '../../components/card'
import Button from '../../components/button'
import Alert from '../../components/alert'
import Ticket from '../../components/ticket'

import Form from 'react-nonconformist'

import DateInput from '../../components/inputs/date'
import TextInput from '../../components/inputs/text'
import GenderInput from '../../components/inputs/gender'
import PhoneInput from '../../components/inputs/phone'
import SwitchInput from '../../components/inputs/switch'
import CPFInput from '../../components/inputs/cpf'
import InputUpload from '../../components/inputs/upload'

import {
  Row,
  Col
} from 'react-bootstrap'

import useMount from '../../helpers/useMount'

import { useDispatch, useSelector } from 'react-redux'

import { getOne, clearUser, set, save, getTransactions } from './actions'

import moment from 'moment'

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const user = useSelector(state => state.users.user)
  const response = useSelector(state => state.users.response)
  const transactions = useSelector(state => state.users.transactions)
  const isLoading = useSelector(state => state.isLoading[getOne])
  const isLoadingTransactions = useSelector(state => state.isLoading[getTransactions])

  return {
    user,
    response,
    transactions,
    get: params => dispatch(getOne(params)),
    set: params => dispatch(set(params)),
    save: params => dispatch(save(params)),
    getTransactions: params => dispatch(getTransactions(params)),
    clearUser: () => dispatch(clearUser()),
    isLoadingTransactions,
    isLoading
  }
}

export default function UserView ({ history, match }) {
  const {
    user,
    response,
    transactions,
    get,
    save,
    set,
    clearUser,
    getTransactions,
    isLoading,
    isLoadingTransactions
  } = useStateAndDispatch()

  useMount(() => {
    get({ uuid: match.params.uuid })
      .then(res => {
        const { value: { data: { data } } } = res
        getTransactions({ cpf: data.cpf })
      })

    return clearUser
  })

  const submit = async () => {
    await save({
      ...user,
      nascimento: user.nascimento
        ? moment(user.nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
        : void (0)
    })
    history.push('/users')
  }

  return (
    <Dashboard title='Ver Usuário'>
      <Row>
        <Col
          md={7} sm={12}
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
                  <SwitchInput {...connect('ativo')} label='Ativo' />
                  <TextInput {...connect('nome')} label='Nome Completo' required />
                  <CPFInput {...connect('cpf')} label='CPF' disabled required />
                  <InputUpload {...connect('foto')} label='Avatar' />
                  <TextInput {...connect('email')} label='Email' required />
                  <DateInput {...connect('nascimento')} label='Data de Nascimento' />
                  <GenderInput {...connect('sexo')} />
                  <PhoneInput {...connect('telefone')} />
                  <TextInput {...connect('rg')} label='RG' type='tel' />
                  <hr />
                  <div style={{ textAlign: 'right' }}>
                    <Button type='submit'>Salvar</Button>
                  </div>
                </form>
              )}
            </Form>
          </Card>
        </Col>
        <Col>
          <Card
            isLoading={isLoadingTransactions}
            header={<h3 className='mb-0'>Trasações</h3>}
            shadow
          >
            {transactions.length === 0 && (
              <Alert variant='info'>
                O usuário não possui transações
              </Alert>
            )}
            {transactions.map(transaction => (
              <Ticket
                key={`transaction-${transaction.uuid}`}
                eventName={transaction.nome_evento || '-'}
                ticketName={transaction.bilhete || '-'}
                userName={transaction.nome || transaction.cpf}
                code={transaction.codigo}
              />
            ))}
          </Card>
        </Col>
      </Row>
    </Dashboard>
  )
}
