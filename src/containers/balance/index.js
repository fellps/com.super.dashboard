import React, { useMemo } from 'react'

import Card from '../../components/card'
import Table from '../../components/table'
import Alert from '../../components/alert'
import Button from '../../components/button'
import Stats from '../../components/stats'

import { ButtonToolbar, ButtonGroup, Row, Col } from 'react-bootstrap'

import Dashboard from '../dashboard'

import { useDispatch, useSelector } from 'react-redux'

import { toReais } from '../../helpers/formatter'

import { get } from './actions'

import useMount from '../../helpers/useMount'

import moment from 'moment'

import Withdraw from './withdraw'

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const transactions = useSelector(state => state.balance.transactions)
  const isLoading = useSelector(state => state.isLoading[get])

  return useMemo(() => ({
    transactions,
    isLoading,
    get: params => dispatch(get(params))
  }), [
    dispatch,
    transactions,
    isLoading
  ])
}

const columns = [
  { dataIndex: 'nome', key: 'nome', title: 'Produtora' },
  { dataIndex: 'descricao', key: 'descricao', title: 'Descritivo' },
  { dataIndex: 'data', key: 'data', title: 'Data', render: d => moment(d).format('DD/MM/YYYY HH') },
  { dataIndex: 'valor', key: 'valor', title: 'Valor', render: d => toReais(d) }
]

export default function Sales ({ match, history }) {
  const {
    get,
    transactions,
    isLoading
} = useStateAndDispatch()

  useMount(() => {
    get({ uuid_evento: match.params.uuid })
  })

  return (
    <Dashboard
      title='Saldo do Evento'
      header={
        <ButtonToolbar
          className='justify-content-between'
        >
          <ButtonGroup>
            {/* <Button variant='primary' className='active'>Próximos</Button>
            <Button variant='secondary'>Realizados</Button> */}
          </ButtonGroup>
          <Button icon='fat-add' onClick={() => history.push({ search: '?withdraw=1' })}>
            Criar Novo Pagamento
          </Button>
        </ButtonToolbar>
      }
    >
      <Row style={{ marginBottom: 20, marginTop: 30 }}>
        <Col>
          <Stats
            title={`Total Repasse`}
            values={[toReais(65734.23)]}
          />
        </Col>
        <Col>
          <Stats
            title={`Restante`}
            values={[toReais(42334.23)]}
          />
        </Col>
      </Row>
      <Card isLoading={isLoading} shadow noBody header={<h3 className='mb-0'>Transações</h3>}>
        {transactions.data.items.length === 0 ? (
          <Alert>Esse evento ainda não possui nenhum recebivel.</Alert>
        ) : (
          <Table
            columns={columns}
            data={transactions.data.items.map(d => ({
              ...d,
              actions: history
            }))}
            // pagination={{
            //   currentPage: transactions.data.current_page,
            //   perPage: Number(transactions.data.per_page),
            //   total: transactions.data.total
            // }}
          />
        )}
      </Card>
      <Withdraw
        uuidEvent={match.params.uuid}
        close={() => history.push({ search: '' })}
        show={String(history.location.search).includes('withdraw')}
      />
    </Dashboard>
  )
}
