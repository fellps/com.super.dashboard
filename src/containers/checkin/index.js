import React from 'react'

import Dashboard from '../dashboard'

import Card from '../../components/card'
import Table from '../../components/table'
import Stats from '../../components/stats'

import bootbox from 'bootbox'

import { checkin } from './actions'

import { useDispatch, useSelector } from 'react-redux'

import * as transactions from '../../api/transactions'

import { Form } from 'react-bootstrap'

import moment from 'moment'

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const burnedTickets = useSelector(state => state.checkin.burnedTickets)
  const isLoading = useSelector(state => state.isLoading[checkin])

  return {
    burnedTickets,
    checkin: params => dispatch(checkin(params)),
    isLoading
  }
}

export default function Checkin () {
  const {
    burnedTickets: checkins,
    checkin: addCheckin,
    isLoading
  } = useStateAndDispatch()

  const onSubmit = e => {
    if (e.target.value && e.key === 'Enter') {
      const codigo = e.target.value
      e.target.value = ''
      transactions.checkin({ codigo })
        .then(() => {
          addCheckin([...checkins, { codigo, at: +new Date() }])
          bootbox.alert('Checkin Realizado com sucesso!')
        })
        .catch(err => {
          bootbox.alert(err.response.data.message)
        })
    }
  }

  return (
    <Dashboard title='Checkin'>
      <Stats
        title={`Entradas`}
        values={[checkins.length]}
      />
      <Card
        header={<h3 className='mb-0'>Check-in</h3>}
        shadow
      >
        <Form.Control
          disabled={isLoading}
          size='lg'
          type='text'
          placeholder='Digite o código do bilhete e pressione enter...'
          onKeyDown={onSubmit}
        />
      </Card>
      <Card
        header={<h3 className='mb-0'>Check-ins</h3>}
        noBody
      >
        <Table
          columns={[
            { key: 'codigo', dataIndex: 'codigo', title: 'Código' },
            { key: 'nome', dataIndex: 'nome', title: 'Nome' },
            { key: 'at', dataIndex: 'at', title: 'Check-in Em', render: d => moment(d).format('YYYY-MM-DD HH:mm:ss') }
          ]}
          data={checkins}
        />
      </Card>
    </Dashboard>
  )
}
