import { createAction } from 'redux-act'

import * as reports from '../../api/reports'

export const getTotalsEvent1 = createAction('COMPARE_EVENTS_GET_TOTALS_EVENT1', reports.totals)
export const getTotalsEvent2 = createAction('COMPARE_EVENTS_GET_TOTALS_EVENT2', reports.totals)
