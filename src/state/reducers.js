import { combineReducers } from 'redux'

import login from '../containers/login/reducer'
import dashboard from '../containers/dashboard/reducer'
import events from '../containers/events/reducer'
import users from '../containers/users/reducer'
import filters from '../containers/filters/reducer'
import salesSummary from '../containers/salesSummary/reducer'
import ordersDelivered from '../containers/ordersDelivered/reducer'
import producers from '../containers/producers/reducer'
import balance from '../containers/balance/reducer'
import menus from '../containers/menus/reducer'
import devices from '../containers/devices/reducer'
import cashierClosing from '../containers/cashierClosing/reducer'

import { reducer as isLoading } from '../helpers/reducerPromiseHelper'

export default combineReducers({
  login,
  dashboard,
  events,
  users,
  filters,
  salesSummary,
  ordersDelivered,
  producers,
  balance,
  menus,
  devices,
  cashierClosing,
  isLoading
})
