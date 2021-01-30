import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  ButtonToolbar,
  Modal
} from 'react-bootstrap'

import Dashboard from '../dashboard'

import useMount from '../../helpers/useMount'

import Filters from '../filters'
import toParams from '../filters/toParams'

import {
  set,
  get,
  clone,
  clearEvent,
  setShowCloneEvent
} from './actions'

import Button from '../../components/button'
import Table from '../../components/table'

import Form from 'react-nonconformist'

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const events = useSelector(state => state.events.events)
  const isLoading = useSelector(state => state.isLoading[get])
  const showCloneEvent = useSelector(state => state.events.showCloneEvent)

  return {
    events,
    isLoading,
    showCloneEvent,
    set: params => dispatch(set(params)),
    get: params => dispatch(get(params)),
    clone: params => dispatch(clone(params)),
    clearEvent: () => dispatch(clearEvent()),
    setShowCloneEvent: params => dispatch(setShowCloneEvent(params))
  }
}

export default function Events ({ history }) {
  const {
    set,
    get,
    clone,
    events,
    clearEvent,
    isLoading,
    showCloneEvent,
    setShowCloneEvent
  } = useStateAndDispatch()

  const handleClone = (id, eventName) => setShowCloneEvent({ show: true, id, eventName })
  const handleClose = () => setShowCloneEvent({ show: false })

  useMount(() => {
    get()
    clearEvent()
  })

  const filter = params => {
    get(toParams(params))
  }

  const columns = [
    { dataIndex: 'name', key: 'name', title: 'Nome' },
    { dataIndex: 'address', key: 'address', title: 'Onde' },
    { dataIndex: 'startDate', key: 'startDate', title: 'Data' },
    {
      dataIndex: 'actions',
      key: 'actions',
      title: 'Ações',
      render: (history, { _id, name }) => (
        <React.Fragment>
          <Button
            to={`/events/${_id}`}
            size='sm'
            variant='success'
          >Editar Evento</Button>
          <Button
            to={`/events/${_id}/menus`}
            size='sm'
            variant='primary'
          >Cardápios</Button>
          <Button
            to={`/events/${_id}/pos`}
            size='sm'
            variant='primary'
          >Pontos de venda</Button>
          <Button
            onClick={() => handleClone(_id, name)}
            size='sm'
            variant='secondary'
          >Clonar evento</Button>
        </React.Fragment>
      )
    }
  ]

  const submit = async () => {
    const { id } = showCloneEvent
    await clone({ id })
    handleClose()
    history.push('/home')
  }

  return (
    <Dashboard
      title='Eventos'
      header={
        <ButtonToolbar
          className='justify-content-end'
        >
          <Button icon='fat-add' to='/events/create'>
            Criar Novo
          </Button>
        </ButtonToolbar>
      }
    >
      <Filters
        title='Eventos'
        history={history}
        isLoading={isLoading}
        onFilter={filter}
        filters={[
          { name: 'events.name', input: 'TextInput', label: 'Nome do evento' }
        ]}
      >
        <Table
          columns={columns}
          data={events && events.data && events.data.length > 0 && events.data.map(d => ({
            ...d,
            actions: history
          }))}
          pagination={{
            currentPage: events.data.current_page,
            perPage: Number(events.data.per_page),
            total: events.data.total
          }}
        />
      </Filters>
      <Modal show={showCloneEvent.show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Clonar evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente clonar este evento?
          <p>
            Nome: <strong fontWeight={'bold'}>{showCloneEvent.eventName}</strong>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Form
            values={showCloneEvent}
            onSubmit={submit}
            onChange={set}
          >
            {(connect, submit) => (
              <form onSubmit={e => {
                e.preventDefault()
                submit()
              }}>
                <Button variant='primary' onClick={submit}>
                Clonar
                </Button>
                <Button variant='secondary' onClick={handleClose}>
                Cancelar
                </Button>
              </form>
            )}
          </Form>
        </Modal.Footer>
      </Modal>
    </Dashboard>
  )
}
