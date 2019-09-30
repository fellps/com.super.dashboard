import { createAction } from 'redux-act'

import * as users from '../../api/users'
import * as transactions from '../../api/transactions'

export const get = createAction('GET_USERS', users.get)

export const getOne = createAction('GET_USER', users.get)
export const set = createAction('SET_USER')
export const clearUser = createAction('CLEAR_USER')
export const save = createAction('SAVE_USER', users.save)

export const getTransactions = createAction('GET_USER_TRANSACTIONS', transactions.get)
