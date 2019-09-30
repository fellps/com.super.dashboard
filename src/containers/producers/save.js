import React from 'react'

import Dashboard from '../dashboard'

import Card from '../../components/card'
import Button from '../../components/button'
import Alert from '../../components/alert'

import Form from 'react-nonconformist'

import TextInput from '../../components/inputs/text'
import PhoneInput from '../../components/inputs/phone'
import InputAddress from '../../components/inputs/address'
import CNPJInput from '../../components/inputs/cnpj'

import {
  Row,
  Col
} from 'react-bootstrap'

import useMount from '../../helpers/useMount'

import { useDispatch, useSelector } from 'react-redux'

import { getOne, set, save, clearProducer } from './actions'

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const producer = useSelector(state => state.producers.edit)
  const saved = useSelector(state => state.producers.saved)
  const isLoading = useSelector(state => state.isLoading[getOne])
  const isLoadingSaving = useSelector(state => state.isLoading[save])

  return {
    producer,
    saved,
    get: params => dispatch(getOne(params)),
    set: params => dispatch(set(params)),
    save: params => dispatch(save(params)),
    clearProducer: params => dispatch(clearProducer(params)),
    isLoadingSaving,
    isLoading
  }
}

export default function ProducersSave ({ history, match }) {
  const {
    producer,
    get,
    save,
    saved,
    set,
    clearProducer,
    isLoading,
    isLoadingSaving
  } = useStateAndDispatch()

  useMount(() => {
    if (match.params.uuid) {
      get({ uuid: match.params.uuid })
    }
    return clearProducer
  })

  const submit = async () => {
    const { address } = producer

    await save({
      _id: producer._id,
      socialReason: producer.socialReason,
      cnpj: String(producer.cnpj).replace(/[^0-9]/gi, ''),
      cep: String(address.cep).replace(/[^0-9]/gi, ''),
      state: address.state,
      city: address.city,
      address: address.address,
      addressNumber: Number(address.addressNumber),
      email: producer.email,
      phone: String(producer.phone).replace(/[^0-9]/gi, '')
    })

    history.push('/producers')
  }

  return (
    <React.Fragment>
      <Form
        values={producer}
        onChange={set}
        onSubmit={submit}
      >
        {(connect, submit) => (
          <Dashboard title='Produtora'>
            <form onSubmit={e => {
              e.preventDefault()
              submit()
            }}>
              <Row>
                <Col md={12} sm={12}>
                  <Card
                    isLoading={isLoading}
                    header={<h3 className='mb-0'>Produtora</h3>}
                    shadow
                  >
                    <Alert variant='danger' show={saved.status === 'error'}>
                      {saved.message}
                      <pre>
                        {JSON.stringify(saved, null, 2)}
                      </pre>
                    </Alert>
                    <TextInput {...connect('socialReason')} label='Razão Social' required />
                    <CNPJInput {...connect('cnpj')} label='CNPJ' required />
                    <InputAddress {...connect('address')} />
                    <TextInput {...connect('email')} label='Email' required />
                    <PhoneInput {...connect('phone')} />
                    <hr />
                  </Card>
                </Col>
              </Row>
              <div style={{ textAlign: 'right', marginTop: 20 }}>
                <Button
                  isLoading={isLoadingSaving}
                  type='submit'
                >Salvar</Button>
              </div>
            </form>
          </Dashboard>
        )}
      </Form>
    </React.Fragment>
  )
}
