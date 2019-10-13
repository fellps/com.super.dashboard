import { createReducer } from 'redux-act'

import {
  set,
  get,
  getOne,
  save,
  clearDevice
} from './actions'

import { fulfilled, pending, rejected } from '../../helpers/reducerPromiseHelper'

const initialState = {
  devices: {
    data: {
      items: []
    }
  },
  device: {},
  response: {
    status: null
  }
}

export default createReducer({
  [set]: (state, payload) => {
    return {
      ...state,
      device: {
        ...state.device,
        ...payload
      }
    }
  },

  [fulfilled(get)]: (state, payload) => ({
    ...state,
    devices: payload.data
  }),

  [fulfilled(getOne)]: (state, payload) => ({
    ...state,
    device: {
      ...state.device,
      ...payload.data.data
    }
  }),

  [fulfilled(save)]: (state, payload) => ({
    ...state,
    device: {
      ...state.device,
      ...payload.data.data
    }
  }),

  [pending(save)]: state => ({
    ...state,
    response: { ...state.response, status: 'pending' }
  }),

  [rejected(save)]: (state, payload) => ({
    ...state,
    response: payload.response.data
  })
}, { ...initialState })
