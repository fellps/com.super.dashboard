import { createAction } from 'redux-act'

import * as reports from '../../api/reports'
import * as transactions from '../../api/transactions'

export const getTransactions = createAction('SALES_GET_TRANSACTIONS', transactions.get)

export const getTotals = createAction('SALES_GET_TOTALS', reports.totals)
