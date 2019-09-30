import { createReducer } from 'redux-act'

import { fulfilled } from '../../helpers/reducerPromiseHelper'

import { checkin } from './actions'

const initialState = {
  burnedTickets: []
}

export default createReducer({
  [fulfilled(checkin)]: (state, payload) => ({
    ...state,
    burnedTickets: [...state.burnedTickets, { ...payload.data.data, at: +new Date() }]
  })
}, { ...initialState })
