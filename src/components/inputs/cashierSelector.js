import React, { Component } from 'react'

import { createInput } from 'react-nonconformist'

import SelectInput from './select'

import { get as getEvents } from '../../api/events'
import { getCashiers, getPOS } from '../../api/users'

import { Row, Col } from 'react-bootstrap'

import find from 'lodash/find'

class CashierCPF extends Component {
  state = {
    isLoading: false,
    events: [],
    cashiers: []
  }

  componentDidMount = async () => {
    if (!this.props.hideEvent) {
      await this._loadEvents()
    }
    await this._loadCashiers(this.props.idEvent)
  }

  _loadEvents = async () => {
    try {
      const { data } = await getEvents()
      this.setState({ events: data.data.map(d => ({ name: d.name, value: d._id, id: d._id })) })
    } catch (err) {}
  }

  _loadCashiers = async event => {
    try {
      let id = null
      const e = find(this.state.events, { value: event })
      if (e !== void (0)) {
        id = e.id
      } else {
        id = event
      }
      const { data } = await getCashiers({ uuid: id })
      this.setState({ cashiers: data.data.cashiers.map(d => ({ name: d, value: d, id: d })) })
    } catch (err) {
      console.log(err)
    }
  }

  _loadPOS = async cashier => {
    try {
      const { data } = await getPOS({ cashier })
      this.setState({ pos: data.data.pos.map(d => ({ name: d, value: d, id: d })) })
    } catch (err) {}
  }

  onChange (e) {
    this._loadCashiers(e.event)
  }

  onChangeCashier (e) {
    this._loadPOS(e.cashier)
  }

  render () {
    const {
      onChangeText,
      value = {},
      hideEvent
    } = this.props

    return (
      <Row>
        { !hideEvent &&
        <Col sm={12} md={4}>
          <SelectInput
            label='Evento'
            onChangeText={event => {
              this.onChange({ ...value, event })
              onChangeText({ ...value, event })
            }}
            value={value.event}
            disabled={this.state.isLoading}
            options={this.state.events}
          />
        </Col>
        }
        <Col sm={12} md={!hideEvent ? 4 : 6}>
          <SelectInput
            label='Caixa'
            onChangeText={cashier => {
              this.onChangeCashier({ ...value, cashier })
              onChangeText({ ...value, cashier })
            }}
            value={value.cashier}
            disabled={this.state.isLoading}
            options={this.state.cashiers}
          />
        </Col>
        <Col sm={12} md={!hideEvent ? 4 : 6}>
          <SelectInput
            label='PDV'
            onChangeText={pos => onChangeText({ ...value, pos })}
            value={value.pos}
            disabled={this.state.isLoading}
            options={this.state.pos}
          />
        </Col>
      </Row>
    )
  }
}

export default createInput({
  inputComponent: CashierCPF
})
