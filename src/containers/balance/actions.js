import { createAction } from 'redux-act'

import * as events from '../../api/events'

export const get = createAction('BALANCE_GET', events.balance)
export const set = createAction('BALANCE_SET')
export const save = createAction('BALANCE_SAVE', events.withdraw)
