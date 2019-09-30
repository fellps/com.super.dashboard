import React, { useMemo } from 'react'

import Stats from '../../components/stats'
import Card from '../../components/card'
import LineChart from '../../components/charts/line'

import Dashboard from '../dashboard'
import Filters from '../filters'

import { Row, Col } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'

import { toNumeric, toReais } from '../../helpers/formatter'

import { getTotalsEvent1, getTotalsEvent2 } from './actions'

import moment from 'moment'

import maxBy from 'lodash/maxBy'
import minBy from 'lodash/minBy'

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const totalsEvent1 = useSelector(state => state.compare.totalsEvent1)
  const hourlyEvent1 = useSelector(state => state.compare.hourlyEvent1)
  const totalsEvent2 = useSelector(state => state.compare.totalsEvent2)
  const hourlyEvent2 = useSelector(state => state.compare.hourlyEvent2)
  const isLoadingTotalsEvent1 = useSelector(state => state.isLoading[getTotalsEvent1])
  const isLoadingTotalsEvent2 = useSelector(state => state.isLoading[getTotalsEvent1])

  return useMemo(() => ({
    totalsEvent1,
    hourlyEvent1,
    totalsEvent2,
    hourlyEvent2,
    isLoadingTotalsEvent1,
    isLoadingTotalsEvent2,
    getTotalsEvent1: params => dispatch(getTotalsEvent1(params)),
    getTotalsEvent2: params => dispatch(getTotalsEvent2(params))
  }), [
    dispatch,
    totalsEvent1,
    hourlyEvent1,
    totalsEvent2,
    hourlyEvent2,
    isLoadingTotalsEvent1,
    isLoadingTotalsEvent2
  ])
}

const tipos = {
  evento: 'Evento(s)',
  setor: 'Setor',
  pdv: 'Pontos de Vendas'
}

const EventReport = ({ totals, isLoading, lineChart  }) => (
  <React.Fragment>
    <Row>
      {totals.map((total) => (
        <Col key={`stats-${total.tipo}`} sm={12} style={{ marginBottom: 15 }}>
          <Stats
            title={`Total ${tipos[total.tipo] || total.tipo}`}
            values={[toReais(total.total_bilhetes), toNumeric(total.quantidade_bilhetes) + ' vendidos']}
          />
        </Col>
      ))}
    </Row>
    <Row>
      <Col sm={12} style={{ marginTop: 30 }}>
        <Card isLoading={isLoading} shadow header={<h3 className='mb-0'>Vendas</h3>}>
          <div style={{ height: 600 }}>
            <LineChart
              data={lineChart}
              yScale={lineChart.yScale}
              axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                legend: 'R$',
                legendOffset: -95,
                // tickRotation: 42,
                legendPosition: 'middle',
                format: toReais
              }}
            />
          </div>
        </Card>
      </Col>
    </Row>
  </React.Fragment>
)

export default function CompareEvents ({ history }) {
  const {
    totalsEvent1,
    hourlyEvent1,
    totalsEvent2,
    hourlyEvent2,
    isLoadingTotalsEvent1,
    isLoadingTotalsEvent2,
    getTotalsEvent1,
    getTotalsEvent2
} = useStateAndDispatch()

  const lineChartEvent1 = useMemo(() => {
    return {
      id: 'Total',
      yScale: {
        type: 'linear',
        stacked: true,
        min: Number((minBy([...hourlyEvent1, ...hourlyEvent2], d => Number(d.total_bilhetes)) || {}).total_bilhetes),
        max: Number((maxBy([...hourlyEvent1, ...hourlyEvent2], d => Number(d.total_bilhetes)) || {}).total_bilhetes)
      },
      color: 'hsl(248, 70%, 50%)',
      data: hourlyEvent1.map(d => ({ x: moment(d.data).format('DD/MM - HH[h]'), y: d.total_bilhetes }))
    }
  }, [hourlyEvent1, hourlyEvent2])

  const lineChartEvent2 = useMemo(() => ({
    id: 'Total',
    yScale: {
      type: 'linear',
      stacked: true,
      min: Number((minBy([...hourlyEvent1, ...hourlyEvent2], d => Number(d.total_bilhetes)) || {}).total_bilhetes),
      max: Number((maxBy([...hourlyEvent1, ...hourlyEvent2], d => Number(d.total_bilhetes)) || {}).total_bilhetes)
    },
    color: 'hsl(248, 70%, 50%)',
    data: hourlyEvent2.map(d => ({ x: moment(d.data).format('DD/MM - HH[h]'), y: d.total_bilhetes }))
  }), [hourlyEvent2, hourlyEvent1])

  const filter = filter => {
    getTotalsEvent1({ uuid_evento: filter.Event1 })
    getTotalsEvent2({ uuid_evento: filter.Event2 })
  }

  return (
    <Dashboard
      title='Comparar Eventos'
      header={
        <Filters
          isLoading={isLoadingTotalsEvent1 || isLoadingTotalsEvent2}
          history={history}
          onFilter={filter}
          filters={[
            { input: 'Event', name: 'Event1', required: true },
            { input: 'Event', name: 'Event2', required: true }
            // { name: 'Date', label: 'Data de Compra' }
          ]}
          title='Comparar Eventos'
        />
      }
    >
      <Row>
        <Col sm={6}>
          <EventReport
            totals={totalsEvent1}
            isLoading={isLoadingTotalsEvent1}
            lineChart={lineChartEvent1}
          />
        </Col>
        <Col sm={6}>
          <EventReport
            totals={totalsEvent2}
            isLoading={isLoadingTotalsEvent2}
            lineChart={lineChartEvent2}
          />
        </Col>
      </Row>
    </Dashboard>
  )
}
