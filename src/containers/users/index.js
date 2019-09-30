import React from 'react'

import Dashboard from '../dashboard'
import Filters from '../filters'
import toParams from '../filters/toParams'

import { useSelector, useDispatch } from 'react-redux'

import useMount from '../../helpers/useMount'

import { get } from './actions'

import Button from '../../components/button'
import Table from '../../components/table'

import { toCPF, toDDMMYYYY } from '../../helpers/formatter'

const columns = [
  {
    dataIndex: 'nome',
    key: 'nome',
    title: 'Nome'
  },
  {
    dataIndex: 'cpf',
    key: 'cpf',
    title: 'CPF',
    render: toCPF
  },
  {
    dataIndex: 'sexo',
    key: 'sexo',
    title: 'Sexo',
    render: s => s === 'm' ? 'Masculino' : s === 'f' ? 'Feminino' : '-'
  },
  {
    dataIndex: 'nascimento',
    key: 'nascimento',
    title: 'Data de Nascimento',
    render: date => date ? toDDMMYYYY(date) : '-'
  },
  {
    dataIndex: 'actions',
    key: 'actions',
    title: 'Ações',
    render: (history, { uuid }) => (
      <React.Fragment>
        <Button
          to={`/users/${uuid}`}
          size='sm'
          variant='info'
        >Ver</Button>
      </React.Fragment>
    )
  }
]

function useStateAndDispatch () {
  const dispatch = useDispatch()
  const users = useSelector(state => state.users.users)
  const isLoading = useSelector(state => state.isLoading[get])

  return {
    users,
    get: params => dispatch(get(params)),
    isLoading
  }
}

export default function Users ({ history }) {
  const { get, isLoading, users } = useStateAndDispatch()
  useMount(() => {
    get()
  })

  const filter = params => {
    get(toParams(params))
  }

  return (
    <Dashboard
      title='Usuários'
    >
      <Filters
        isLoading={isLoading}
        history={history}
        onFilter={filter}
        filters={[
          { name: 'nome', input: 'TextInput', label: 'Nome' },
          { name: 'CPF', label: 'CPF', placeholder: '' }
        ]}
        title='Usuários'
      >
        <Table
          columns={columns}
          data={users.data.items.map(d => ({
            ...d,
            actions: history
          }))}
          pagination={{
            currentPage: users.data.current_page,
            perPage: Number(users.data.per_page),
            total: users.data.total
          }}
        />
      </Filters>
    </Dashboard>
  )
}
