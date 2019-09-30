import { createReducer } from 'redux-act'

import { set } from './actions'

const initialState = { }

export default createReducer({
  [set]: (state, payload) => {
    return ({
      ...state,
      ...payload
    })
  }
}, { ...initialState })
