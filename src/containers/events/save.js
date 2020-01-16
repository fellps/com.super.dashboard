import React from 'react'

import Dashboard from '../dashboard'

import { useDispatch, useSelector } from 'react-redux'

import Card from '../../components/card'
import Alert from '../../components/alert'

import {
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup
} from 'react-bootstrap'

import {
  set,
  save,
  clearEvent,
  getOne
} from './actions'

import {
  get as getProducers
} from '../producers/actions'

import useMount from '../../helpers/useMount'

import Button from '../../components/button'

import InputText from '../../components/inputs/text'
import InputEventPassword from '../../components/inputs/eventPassword'
import SwitchInput from '../../components/inputs/switch'
import InputWysiwyg from '../../components/inputs/wysiwyg'
import InputDate from '../../components/inputs/date'
import InputHour from '../../components/inputs/hour'
import InputAddress from '../../components/inputs/address'
import SelectInput from '../../components/inputs/select'
import InputUpload from '../../components/inputs/upload'

import Form from 'react-nonconformist'

import moment from 'moment'

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const event = useSelector(state => state.events.event)
  const producers = useSelector(state => state.producers.producers)
  const response = useSelector(state => state.events.response)
  const isLoading = useSelector(state => state.isLoading[save])

  return {
    event,
    producers,
    response,
    isLoading,
    save: params => dispatch(save(params)),
    set: params => dispatch(set(params)),
    clearEvent: () => dispatch(clearEvent()),
    getOne: params => dispatch(getOne(params)),
    getProducers: params => dispatch(getProducers())
  }
}

export default function EventSave ({ history, match }) {
  const {
    event,
    producers,
    response,
    isLoading,
    save,
    set,
    getOne,
    getProducers
  } = useStateAndDispatch()

  const screenType = match.path === '/events/:uuid' ? 'edit' : 'view'

  useMount(() => {
    if (match.path === '/events/:uuid') {
      getOne({ uuid: match.params.uuid })
    }
    getProducers()
  })

  const submit = async () => {
    const { address } = event

    const addressData = {
      cep: address !== void (0) ? String(address.cep).replace(/[^0-9]/gi, '') : '',
      state: address !== void (0) ? address.state : '',
      city: address !== void (0) ? address.city : '',
      address: address !== void (0) ? address.address : '',
      addressNumber: address !== void (0) ? Number(address.addressNumber) : 0
    }

    await save({
      _id: event._id,
      name: event.name,
      description: event.description,
      image: event.image,
      startDate: moment.utc(event.startDate + ' ' + event.startTime, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm:ssZ'),
      endDate: moment.utc(event.endDate + ' ' + event.endTime, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DDTHH:mm:ssZ'),
      producerId: event.producerId,
      managerPassword: event.managerPassword,
      isEnabled: event.isEnabled,
      ...addressData
    })

    history.push('/home')
  }

  return (
    <Dashboard
      title={screenType === 'edit' ? 'Editar Evento' : 'Novo Evento'}
      header={
        <ButtonToolbar className='justify-content-between'>
          <ButtonGroup>
            <Button variant='secondary' to={`/events`}>←&nbsp;&nbsp;Voltar</Button>
          </ButtonGroup>
          <div>
            <Button icon='fat-add' to={`/events/${event._id}/menus`} style={{ marginright: 15 }}>
              Cardápios
            </Button>
            <Button icon='fat-add' to={`/events/${event._id}/pos`}>
              Pontos de Venda
            </Button>
          </div>
        </ButtonToolbar>
      }>
      <Alert variant='danger' show={response.status === 'error'}>
        {response.message}
      </Alert>
      <Form
        values={event}
        onSubmit={submit}
        onChange={set}
      >
        {(connect, submit) => (
          <form onSubmit={e => {
            e.preventDefault()
            submit()
          }}>
            <Card
              header={<h3 className='mb-0'>Evento</h3>}
              shadow
            >
              <Row>
                <Col sm={12} md={12}>
                  {screenType === 'edit' && <SwitchInput {...connect('isEnabled')} label='Status do evento' />}
                  <InputText {...connect('name')} label='Nome do evento' required />
                  <SelectInput
                    {...connect('producerId')}
                    label={'Produtora'}
                    value={event.producerId}
                    disabled={match.path === '/events/:uuid'}
                    options={producers}
                    required
                  />
                  <Row>
                    <Col><InputDate {...connect('startDate')} label='Data Inicio' required /></Col>
                    <Col sm={12} md={5}><InputHour {...connect('startTime')} label='Hora Inicio' required /></Col>
                  </Row>
                  <Row>
                    <Col>
                      <InputDate
                        {...connect('endDate')}
                        disabledDaysBefore={event.startDate}
                        label='Data Fim'
                        required
                      />
                    </Col>
                    <Col sm={12} md={5}><InputHour {...connect('endTime')} label='Hora Fim' required /></Col>
                  </Row>
                  <hr />
                  <InputEventPassword {...connect('managerPassword')} label='Senha de gestor do evento' required />
                  <hr />
                  <InputAddress {...connect('address')} />
                  <Row>
                    <Col md={4} sm={12}>
                      <InputUpload {...connect('image')} label='Imagem de impressão (414x161)' />
                    </Col>
                    <Col md={8} sm={12}>
                      <InputWysiwyg {...connect('description')} label='Descrição' required />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
            <div style={{ marginTop: 20 }}>
              <Alert variant='danger' show={response.status === 'error'}>
                {response.message}
                <pre>
                  {JSON.stringify(response, null, 2)}
                </pre>
              </Alert>
              <Button
                isLoading={isLoading}
                type='button'
                onClick={submit}
              >Salvar</Button>
            </div>
          </form>
        )}
      </Form>
    </Dashboard>
  )
}
