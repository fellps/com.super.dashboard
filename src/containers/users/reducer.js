
import { createReducer } from 'redux-act'

import { get, getOne, clearUser, set, save } from './actions'

import {
  fulfilled,
  pending,
  rejected
} from '../../helpers/reducerPromiseHelper'

const initialState = {
  users: {
    data: { items: [] }
  },

  user: {
    isEnabled: true
  },

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
        ...user
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
