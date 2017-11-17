import React from 'react'
import './ImportData.styl'
import { Row, Col, Input, Button } from 'react-materialize'

export default (props) => {
  return (
    <div>
      <Row>
        <Col s={6} offset='4' >
          Please insert new CSV document
        </Col>
      </Row>
      <Row>
        <Col s={12} offset='4' >
          <Input s={6} type='file' name='csv' />
        </Col>
      </Row>
      <Row>
        <Col s={12} offset='4' >
          <Button waves='light' node='a' href='/' >Import</Button>
        </Col>
      </Row>
    </div>
  )
}
