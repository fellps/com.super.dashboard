import React from 'react'

import InputCurrency from '../../components/inputs/currency'
import TicketTypeSelector from '../../components/inputs/ticketTypeSelector'
import InputText from '../../components/inputs/text'
import InputDate from '../../components/inputs/date'
import InputHour from '../../components/inputs/hour'
import InputSwitch from '../../components/inputs/switch'

import Button from '../../components/button'

import bootbox from 'bootbox'

import {
  Row,
  Col
} from 'react-bootstrap'

function confirmRemovalTicket (confirm) {
  return () => {
    bootbox.confirm({
      title: 'Confirmar',
      message: `Você tem certeza de que  deseja excluir esse ingresso? Essa ação é irreversivel.`,
      locale: 'br',
      centerVertical: true,
      callback: yes => {
        yes && confirm()
      }
    })
  }
}

export default function Tickets ({ children }) {
  return (
    <React.Fragment>
      <Row>
        <Col md={3}><h4>Tipo*</h4></Col>
        <Col md={3}><h4>Quantidade*</h4></Col>
        <Col md={3}><h4>Valor Unitário*</h4></Col>
        <Col md={3} style={{ textAlign: 'right' }}><h4>Ações</h4></Col>
      </Row>
      {children}
    </React.Fragment>
  )
}

export function Ticket ({ connect, localId, ticket, removeTicket }) {
  return (
    <Row style={{
      marginTop: 10,
      marginBottom: 10,
      paddingTop: 40,
      paddingBottom: 15,
      borderRadius: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.03)'
    }}>
      <Col md={3}>
        <TicketTypeSelector
          required
          {...connect(`tickets.${localId}.uuid_tipo_bilhete`)}
        />
      </Col>
      <Col md={3}>
        <InputText
          required
          type='number'
          {...connect(`tickets.${localId}.quantidade`)}
        />
      </Col>
      <Col md={3}>
        <InputCurrency
          required
          {...connect(`tickets.${localId}.valor_bilhete`)}
        />
      </Col>
      <Col md={3} style={{ textAlign: 'right' }}>
        <Button
          icon='fat-remove'
          variant='danger'
          onClick={confirmRemovalTicket(removeTicket)}
        />
      </Col>
      <Col md={12}>
        <Row>
          <Col md={4}>
            {ticket.uuid && <InputSwitch {...connect(`tickets.${localId}.ativo`)} label='Status' />}
            <InputText
              label='Nome Ingresso'
              required
              {...connect(`tickets.${localId}.nome`)}
            />
            <InputText
              label='Informações do ingresso'
              placeholder='Adicione informações EXTRAS.'
              required
              type='textarea'
              {...connect(`tickets.${localId}.informacao`)}
            />
          </Col>
          <Col md={5}>
            <Row>
              <Col>
                <InputDate
                  {...connect(`tickets.${localId}.data_inicio_venda`)}
                  label='Data Inicio de Vendas'
                  required
                />
              </Col>
              <Col sm={12} md={5}>
                <InputHour
                  {...connect(`tickets.${localId}.data_inicio_venda_hora`)}
                  label='Hora'
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <InputDate
                  {...connect(`tickets.${localId}.data_fim_venda`)}
                  label='Data Fim de Vendas'
                  required
                />
              </Col>
              <Col sm={12} md={5}>
                <InputHour
                  {...connect(`tickets.${localId}.data_fim_venda_hora`)}
                  label='Hora'
                  required
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}
