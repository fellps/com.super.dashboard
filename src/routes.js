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

import BalanceEvent from './containers/balance'

import Users from './containers/users'
import UsersView from './containers/users/view'
import UsersSave from './containers/users/save'

import SalesSummary from './containers/salesSummary'

import OrdersDelivered from './containers/ordersDelivered'

import CashierClosing from './containers/cashierClosing'

import { loggedUser } from './api'

export let routes = [
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
  { path: '/reports/sales-summary', name: 'Resumo de vendas', icon: 'chart-bar-32 text-green', exact: true, menu: true, component: SalesSummary },
  { path: '/reports/summary-of-orders-delivered', name: 'Resumo de entregas', icon: 'delivery-fast text-red', exact: true, menu: true, component: OrdersDelivered },
  { path: '/reports/cashier-closing', name: 'Fechamento de caixa', icon: 'money-coins text-orange', exact: true, menu: true, component: CashierClosing },
  { path: '/producers/create', exact: true, component: ProducersSave },
  { path: '/producers/:uuid', exact: true, component: ProducersSave },
  { path: '/login', exact: true, component: Login },
  { path: '/forgot-password', exact: true, component: ForgotPassword },
  { path: '/forgot-password/change', exact: true, component: ForgotPasswordChange },
  { path: '/external/reports/sales-summary/:uuid', name: 'Resumo de vendas', exact: true, menu: false, hideMenu: true, component: SalesSummary }
]

const admin = [
  '5e053028d868f9076283513a', // Fellipe
  '5df3c4e254391a4877e20491', // Henrique
  '5e3b17c880826b03d7361cd7' // Alex
]

const data = loggedUser()

if (admin.includes(data._id)) {
  routes.push({ path: '/users', name: 'Usuários', icon: 'circle-08 text-purple', exact: true, menu: true, component: Users })
  routes.push({ path: '/create-user', name: 'Cadastrar usuário', icon: 'circle-08 text-blue', exact: true, menu: true, component: UsersSave })
}

export default function Routes () {
  return (
    <Router>
      <Switch>
        {routes.map(route => <Route key={`routes-${route.path}`} {...route} />)}
      </Switch>
    </Router>
  )
}
