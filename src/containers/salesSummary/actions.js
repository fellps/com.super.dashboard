import { createAction } from 'redux-act'

import * as reports from '../../api/reports'

export const getSalesSummary = createAction('GET_SALES_SUMMARY', reports.salesSummary)
