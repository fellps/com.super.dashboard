import React from 'react'

import { Modal } from 'react-bootstrap'

import Button from '../../components/button'

import { set, save, get } from './actions'

import { useSelector, useDispatch } from 'react-redux'

import Form from 'react-nonconformist'

import InputCurrency from '../../components/inputs/currency'
import InputText from '../../components/inputs/text'
import ProducerSelector from '../../components/inputs/producerSelectorByEvent'
import Alert from '../../components/alert'

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const withdraw = useSelector(state => state.balance.withdraw)
  const response = useSelector(state => state.balance.response)
  const isLoading = useSelector(state => state.isLoading[save])

  return {
    withdraw,
    response,
    set: params => dispatch(set(params)),
    get: params => dispatch(get(params)),
    save: params => dispatch(save(params)),
    isLoading
  }
}

export default function Withdraw ({ show, close, uuidEvent }) {
  const { response, withdraw, isLoading, set, get } = useStateAndDispatch()

  const submit = async () => {
    // const data = {
    //  ...withdraw,
    // valor: Number.parseInt(withdraw.valor),
    // uuid_evento: uuidEvent
    // }

    // await save(data)

    close()

    get({ uuid_evento: uuidEvent })
  }

  return (
    <Modal
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Nova Conta Bancária</Modal.Title>
      </Modal.Header>
      <Form
        values={withdraw}
        onChange={set}
        onSubmit={submit}
      >
        {(connect, submit) => (
          <React.Fragment>
            <Modal.Body>
              <Alert variant='danger' show={response.status === 'error'}>
                {response.message}
                {JSON.stringify(response, null, 2)}
              </Alert>
              <ProducerSelector label='Produtora' {...connect('uuid_produtora')} uuidEvent={uuidEvent} required />
              <InputCurrency label='Valor' {...connect('valor')} required />
              <InputText label='Descrição' {...connect('descricao')} required />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={close} variant='secondary'>Fechar</Button>
              <Button variant='primary' isLoading={isLoading} onClick={submit}>Criar</Button>
            </Modal.Footer>
          </React.Fragment>
        )}
      </Form>
    </Modal>
  )
}
