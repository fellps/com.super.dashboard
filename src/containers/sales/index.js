import React, { useMemo } from 'react'

import Stats from '../../components/stats'
import Card from '../../components/card'
import LineChart from '../../components/charts/line'
import Table from '../../components/table'
import Alert from '../../components/alert'

import Dashboard from '../dashboard'
import Filters from '../filters'

import { Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'

import { toNumeric, toReais, toCPF } from '../../helpers/formatter'

import { getTotals, getTransactions } from './actions'

import useMount from '../../helpers/useMount'

import moment from 'moment'

import isEmpty from 'lodash/isEmpty'

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const totals = useSelector(state => state.sales.totals)
  const hourly = useSelector(state => state.sales.hourly)
  const transactions = useSelector(state => state.sales.transactions)
  const isLoadingTotals = useSelector(state => state.isLoading[getTotals])
  const isLoadingTransactions = useSelector(state => state.isLoading[getTransactions])

  return useMemo(() => ({
    totals,
    hourly,
    transactions,
    isLoadingTotals,
    isLoadingTransactions,
    getTotals: params => dispatch(getTotals(params)),
    getTransactions: params => dispatch(getTransactions(params))
  }), [
    dispatch,
    totals,
    hourly,
    transactions,
    isLoadingTotals,
    isLoadingTransactions
  ])
}

const tipos = {
  evento: 'Evento(s)',
  setor: 'Setor',
  pdv: 'Pontos de Vendas'
}

const columns = [
  { dataIndex: 'codigo', key: 'codigo', title: 'Código' },
  { dataIndex: 'bilhete', key: 'bilhete', title: 'Nome do Ingresso' },
  {
    dataIndex: 'cadastro',
    key: 'cadastro',
    title: 'Comprado em',
    render: d => moment(d).format('DD/MM/YYYY HH:mm:ss')
  },
  { dataIndex: 'pdv', key: 'pdv', title: 'PDV', render: d => d || '-' },
  { dataIndex: 'setor', key: 'setor', title: 'Setor', render: d => d || '-' },
  { dataIndex: 'valor', key: 'valor', title: 'Valor', render: toReais },
  { dataIndex: 'cpf', key: 'cpf', title: 'CPF', render: d => d ? toCPF(d) : '-' }
]

export default function Sales ({ history }) {
  const {
    getTotals,
    getTransactions,
    hourly,
    totals,
    transactions,
    isLoadingTotals,
    isLoadingTransactions
} = useStateAndDispatch()

  useMount(() => {
    getTotals()
    getTransactions()
  })

  const lineChart = useMemo(() => ({
    id: 'Total',
    color: 'hsl(248, 70%, 50%)',
    data: hourly.map(d => ({ x: moment(d.data).format('DD/MM - HH[h]'), y: d.total_bilhetes }))
  }), [hourly])

  const filter = filter => {
    const mapper = {
      uuid_evento: filter.Event,
      uuid_tipo_evento: filter.EventType,
      cpf: filter.CPF ? String(filter.CPF).replace(/[^0-9]/gi, '') : void (0)
    }

    getTotals(mapper)
    getTransactions(mapper)
  }

  return (
    <Dashboard
      title='Vendas'
      header={
        <Filters
          isLoading={isLoadingTotals}
          history={history}
          onFilter={filter}
          filters={[
            { name: 'Event' },
            { name: 'EventType', label: 'Tipo de Evento' },
            { name: 'CPF', label: 'CPF' },
            // { name: 'Date', label: 'Data de Compra' }
          ]}
          title='Vendas'
        />
      }
    >
      <Row>
        {totals.map((total) => (
          <Col key={`stats-${total.tipo}`} sm={12} md={Number.parseInt(12 / totals.length)}>
            <Stats
              title={`Total ${tipos[total.tipo] || total.tipo}`}
              values={[toReais(total.total_bilhetes), toNumeric(total.quantidade_bilhetes) + ' vendidos']}
            />
          </Col>
        ))}
      </Row>
      <Row>
        <Col sm={12} style={{ marginTop: 30 }}>
          <Card isLoading={isLoadingTotals} shadow header={<h3 className='mb-0'>Vendas</h3>}>
            {isEmpty(hourly) ? (
              <Alert variant='warning'>Não há gráfico para esse momento.</Alert>
            ) : (
              <div style={{ height: 600 }}>
                <LineChart
                  data={lineChart}
                  axisLeft={{ format: toReais }}
                />
              </div>
            )}
          </Card>
          <Card isLoading={isLoadingTransactions} shadow header={<h3 className='mb-0'>Transações</h3>}>
            <Table
              columns={columns}
              data={transactions.data.items.map(d => ({
                ...d,
                actions: history
              }))}
              pagination={{
                currentPage: transactions.data.current_page,
                perPage: Number(transactions.data.per_page),
                total: transactions.data.total
              }}
            />
          </Card>
        </Col>
      </Row>
    </Dashboard>
  )
}
