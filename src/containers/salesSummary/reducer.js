import { createReducer } from 'redux-act'

import { fulfilled, rejected } from '../../helpers/reducerPromiseHelper'

import {
  getSalesSummary
} from './actions'

const initialState = {
  salesSummary: {}
}

export default createReducer({
  [fulfilled(getSalesSummary)]: (state, payload) => ({
    ...state,
    salesSummary: payload.data.data
  }),

  [rejected(getSalesSummary)]: (state, payload) => ({
    ...state,
    salesSummary: { ...initialState.salesSummary }
  }),
}, { ...initialState })
