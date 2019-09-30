import { createReducer } from 'redux-act'

import { fulfilled } from '../../helpers/reducerPromiseHelper'

import {
  getTransactions,
  getTotals
} from './actions'

const initialState = {
  totals: [],
  hourly: [],
  transactions: { data: { items: [] } }
}

export default createReducer({
  [fulfilled(getTransactions)]: (state, payload) => ({
    ...state,
    transactions: payload.data
  }),

  [fulfilled(getTotals)]: (state, payload) => ({
    ...state,
    totals: payload.data.data.totais,
    hourly: payload.data.data.grafico
  })
}, { ...initialState })
