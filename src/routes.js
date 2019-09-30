import React from 'react'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Login from './containers/login'
import ForgotPassword from './containers/login/forgotPassword'
import ForgotPasswordChange from './containers/login/forgotPasswordChange'

import Events from './containers/events'
import SaveEvent from './containers/events/save'
import BalanceEvent from './containers/balance'

import Menus from './containers/menus'
import SaveMenu from './containers/menus/save'

import Transactions from './containers/transactions'

import Producers from './containers/producers'
import ProducersSave from './containers/producers/save'

import Checkin from './containers/checkin'

import Users from './containers/users'
import UsersView from './containers/users/view'

import Sales from './containers/sales'

import CompareEvents from './containers/compareEvents'

export const routes = [
  { path: '/', exact: true, menu: false, component: () => <Redirect to='/events' /> },
  { path: '/home', name: 'Início', icon: 'tv-2 text-primary', exact: true, menu: true, component: Events },
  { path: '/producers', name: 'Produtoras', icon: 'building text-blue', exact: true, menu: true, component: Producers },
  { path: '/events', name: 'Eventos', icon: 'world', exact: true, menu: true, component: Events },
  { path: '/events/create', exact: true, component: SaveEvent },
  { path: '/events/:uuid', exact: true, component: SaveEvent },
  { path: '/events/:uuid/balance', exact: true, component: BalanceEvent },
  { path: '/events/:uuid/menus', exact: true, component: Menus },
  { path: '/events/:uuid/menus/create', exact: true, component: SaveMenu },
  { path: '/events/:uuid/menus/:uuidMenu', exact: true, component: SaveMenu },
  { path: '/users/:uuid', exact: true, component: UsersView },
  { path: '/users', name: 'Usuários', icon: 'circle-08 text-pink', exact: true, menu: true, component: Users },
  { path: '/transactions', name: 'Transações', icon: 'shop text-orange', exact: true, menu: true, component: Transactions },
  { path: '/checkin', name: 'Check-in', icon: 'building text-yellow', exact: true, menu: true, component: Checkin },
  { path: '/sales', name: 'Vendas', icon: 'chart-bar-32 text-red', exact: true, menu: true, component: Sales },
  { path: '/compare', name: 'Comparar Eventos', icon: 'scissors text-info', exact: true, menu: true, component: CompareEvents },
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
