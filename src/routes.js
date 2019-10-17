import React from 'react'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from './containers/login'
import ForgotPassword from './containers/login/forgotPassword'
import ForgotPasswordChange from './containers/login/forgotPasswordChange'

import Events from './containers/events'
import EventsSave from './containers/events/save'

import Menus from './containers/menus'
import SaveMenu from './containers/menus/save'

import Producers from './containers/producers'
import ProducersSave from './containers/producers/save'

import Devices from './containers/devices'
import DevicesSave from './containers/devices/save'

import Transactions from './containers/transactions'
import BalanceEvent from './containers/balance'

import Users from './containers/users'
import UsersView from './containers/users/view'

import Sales from './containers/sales'
import SalesSummary from './containers/salesSummary'

import OrdersDelivered from './containers/ordersDelivered'

import CompareEvents from './containers/compareEvents'

export const routes = [
  { path: '/', exact: true, menu: false, component: () => <Redirect to='/events' /> },
  { path: '/home', name: 'Início', icon: 'tv-2 text-primary', exact: true, menu: true, component: Events },
  { path: '/producers', name: 'Produtoras', icon: 'building text-blue', exact: true, menu: true, component: Producers },
  { path: '/events', name: 'Eventos', icon: 'world', exact: true, menu: true, component: Events },
  { path: '/events/create', exact: true, component: EventsSave },
  { path: '/events/:uuid', exact: true, component: EventsSave },
  { path: '/events/:uuid/balance', exact: true, component: BalanceEvent },
  { path: '/events/:uuid/menus', exact: true, component: Menus },
  { path: '/events/:uuid/menus/create', exact: true, component: SaveMenu },
  { path: '/events/:uuid/menus/:uuidMenu', exact: true, component: SaveMenu },
  { path: '/events/:uuid/pos', exact: true, component: Devices },
  { path: '/events/:uuid/pos/create', exact: true, component: DevicesSave },
  { path: '/events/:uuid/pos/:uuidDevice', exact: true, component: DevicesSave },
  { path: '/users/:uuid', exact: true, component: UsersView },
  { path: '/users', name: 'Usuários', icon: 'circle-08 text-pink', exact: true, menu: true, component: Users },
  // { path: '/transactions', name: 'Transações', icon: 'shop text-orange', exact: true, menu: true, component: Transactions },
  // { path: '/sales', name: 'Vendas', icon: 'chart-bar-32 text-red', exact: true, menu: true, component: Sales },
  { path: '/reports/sales-summary', name: 'Resumo de vendas', icon: 'chart-bar-32 text-red', exact: true, menu: true, component: SalesSummary },
  { path: '/reports/summary-of-orders-delivered', name: 'Resumo de entregas', icon: 'delivery-fast text-red', exact: true, menu: true, component: OrdersDelivered },
  // { path: '/compare', name: 'Comparar Eventos', icon: 'scissors text-info', exact: true, menu: true, component: CompareEvents },
  { path: '/producers/create', exact: true, component: ProducersSave },
  { path: '/producers/:uuid', exact: true, component: ProducersSave },
  { path: '/login', exact: true, component: Login },
  { path: '/forgot-password', exact: true, component: ForgotPassword },
  { path: '/forgot-password/change', exact: true, component: ForgotPasswordChange }
]

export default function Routes () {
  return (
    <Router>
      <Switch>
        {routes.map(route => <Route key={`routes-${route.path}`} {...route} />)}
      </Switch>
    </Router>
  )
}
