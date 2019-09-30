import { createAction } from 'redux-act'

import * as transactions from '../../api/transactions'

export const checkin = createAction('CHECKIN', transactions.checkin)
