import { createReducer } from 'redux-act'

import { fulfilled } from '../../helpers/reducerPromiseHelper'

import {
  getTotalsEvent1,
  getTotalsEvent2
} from './actions'

const initialState = {
  totalsEvent1: [],
  hourlyEvent1: [],
  totalsEvent2: [],
  hourlyEvent2: []
}

export default createReducer({
  [fulfilled(getTotalsEvent1)]: (state, payload) => ({
    ...state,
    totalsEvent1: payload.data.data.totais,
    hourlyEvent1: payload.data.data.grafico
  }),

  [fulfilled(getTotalsEvent2)]: (state, payload) => ({
    ...state,
    totalsEvent2: payload.data.data.totais,
    hourlyEvent2: payload.data.data.grafico
  })
}, { ...initialState })
