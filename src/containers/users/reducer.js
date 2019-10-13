
import { createReducer } from 'redux-act'

import { get, getOne, clearUser, set, save } from './actions'

import {
  fulfilled,
  pending,
  rejected
} from '../../helpers/reducerPromiseHelper'

import moment from 'moment'

const initialState = {
  users: {
    data: { items: [] }
  },

  user: {},

  transactions: [],

  response: { status: null }
}

export default createReducer({
  [fulfilled(get)]: (state, payload) => ({
    ...state,
    users: payload.data
  }),

  [fulfilled(getOne)]: (state, payload) => {
    const user = payload.data.data

    return {
      ...state,
      user: {
        ...user,
        nascimento: user.nascimento
          ? moment(user.nascimento, 'YYYY-MM-DD').format('DD/MM/YYYY')
          : void (0)
      }
    }
  },

  [pending(save)]: state => ({
    ...state,
    response: { ...state.response, status: 'pending' }
  }),

  [rejected(save)]: (state, payload) => ({
    ...state,
    response: payload.response.data
  }),

  [set]: (state, payload) => ({
    ...state,
    user: {
      ...state.user,
      ...payload
    }
  }),

  [clearUser]: state => ({
    ...state,
    user: { ...initialState.user }
  })
}, { ...initialState })
