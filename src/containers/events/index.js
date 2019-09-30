import React from 'react'

import Dashboard from '../dashboard'

import { useSelector, useDispatch } from 'react-redux'

import useMount from '../../helpers/useMount'

import Filters from '../filters'
import toParams from '../filters/toParams'

import {
  ButtonToolbar
} from 'react-bootstrap'

import { get, clearEvent } from './actions'

import Button from '../../components/button'
import Table from '../../components/table'

const columns = [
  { dataIndex: 'name', key: 'name', title: 'Nome' },
  { dataIndex: 'address', key: 'address', title: 'Onde' },
  { dataIndex: 'startDate', key: 'startDate', title: 'Data' },
  {
    dataIndex: 'actions',
    key: 'actions',
    title: 'Ações',
    render: (history, { _id }) => (
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
          to={`/events/pos/${_id}`}
          size='sm'
          variant='primary'
        >Pontos de venda</Button>
      </React.Fragment>
    )
  }
]

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const events = useSelector(state => state.events.events)
  const isLoading = useSelector(state => state.isLoading[get])

  return {
    events,
    isLoading,
    get: params => dispatch(get(params)),
    clearEvent: () => dispatch(clearEvent())
  }
}

export default function Events ({ history }) {
  const {
    get,
    events,
    clearEvent,
    isLoading
  } = useStateAndDispatch()

  useMount(() => {
    get()
    clearEvent()
  })

  const filter = params => {
    get(toParams(params))
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
    </Dashboard>
  )
}
