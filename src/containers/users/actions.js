import { createAction } from 'redux-act'

import * as users from '../../api/users'

export const get = createAction('GET_USERS', users.get)
export const getOne = createAction('GET_USER', users.getOne)
export const save = createAction('SAVE_USER', users.save)
export const create = createAction('CREATE_USER', users.create)

export const clearUser = createAction('CLEAR_USER')
export const set = createAction('SET_USER')
