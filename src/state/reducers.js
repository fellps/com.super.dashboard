import { combineReducers } from 'redux'

import login from '../containers/login/reducer'
import dashboard from '../containers/dashboard/reducer'
import events from '../containers/events/reducer'
import users from '../containers/users/reducer'
import filters from '../containers/filters/reducer'
import transactions from '../containers/transactions/reducer'
import checkin from '../containers/checkin/reducer'
import sales from '../containers/sales/reducer'
import producers from '../containers/producers/reducer'
import compare from '../containers/compareEvents/reducer'
import balance from '../containers/balance/reducer'
import menus from '../containers/menus/reducer'

import { reducer as isLoading } from '../helpers/reducerPromiseHelper'

export default combineReducers({
  login,
  dashboard,
  events,
  users,
  transactions,
  checkin,
  filters,
  sales,
  producers,
  compare,
  balance,
  menus,
  isLoading
})
