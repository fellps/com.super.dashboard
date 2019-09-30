import { createReducer } from 'redux-act'

import { rejected } from '../../helpers/reducerPromiseHelper'

import {
  set,
  save
} from './actions'

import Chance from 'chance'

const chance = new Chance()

const initialState = {
  transactions: {
    data: {
      items: [
        { nome: 'Produtora Feliz', valor: chance.integer({ min: 100, max: 6000 }), data: chance.date(), descricao: 'Repasse do evento'  },
        { nome: 'Produtora Feliz', valor: chance.integer({ min: 100, max: 6000 }), data: chance.date(), descricao: 'Repasse do evento'  },
        { nome: 'Produtora Feliz', valor: chance.integer({ min: 100, max: 6000 }), data: chance.date(), descricao: 'Repasse do evento'  },
        { nome: 'Produtora Feliz', valor: chance.integer({ min: 100, max: 6000 }), data: chance.date(), descricao: 'Repasse do evento'  },
        { nome: 'Produtora Feliz', valor: chance.integer({ min: 100, max: 6000 }), data: chance.date(), descricao: 'Repasse do evento'  },
        { nome: 'Produtora Feliz', valor: chance.integer({ min: 100, max: 6000 }), data: chance.date(), descricao: 'Repasse do evento'  },
        { nome: 'Produtora Feliz', valor: chance.integer({ min: 100, max: 6000 }), data: chance.date(), descricao: 'Repasse do evento'  }
      ]
    }
  },
  withdraw: {},
  response: {}
}

export default createReducer({
  // [fulfilled(get)]: (state, payload) => ({
  //   ...state,
  //   transactions: payload.data
  // }),

  [set]: (state, payload) => ({
    ...state,
    withdraw: { ...state.withdraw, ...payload }
  }),

  [rejected(save)]: (state, payload) => ({
    ...state,
    response: payload.response.data
  }),
}, { ...initialState })
