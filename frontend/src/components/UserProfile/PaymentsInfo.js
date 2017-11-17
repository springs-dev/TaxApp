import React from 'react'
import { Grid, Form, Checkbox, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

class PaymentsInfo extends React.Component {
  render () {
    const {
      Card_Holder_Name,
      Card_Number,
      Billing_Address,
      Expiration,
      CVC,
      emailBill,
      autoPay
    } = this.props.paymentData
    return (
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={4} />
          <Grid.Column width={8}>
            <Form>
              <Form.Input
                id='form-input-control-ch-name'
                name='chname'
                label='Card Holder Name *'
                value={Card_Holder_Name}
              />
              <Form.Input
                id='form-input-control-first-name'
                name='billingAddress'
                label='Billing Address'
                value={Billing_Address}
              />
              <Form.Input
                id='form-input-control-first-name'
                name='pin'
                label='Card Number *'
                value={Card_Number}
              />
              <Form.Group>
                <Form.Input
                  width={9}
                  id='form-input-control-first-exp'
                  name='expiration'
                  label='Expiration(MM/YYYY) *'
                  value={Expiration}
                />
                <Form.Input
                  width={7}
                  id='form-input-control-first-cvc'
                  name='cdv'
                  label='CVC *'
                  value={CVC}
                />
              </Form.Group>
              <Form.Field label='Payment Options *' />

              <Grid.Row>
                <Grid.Column width={7}>
                  <Checkbox
                    checked={autoPay === 'yes'}
                    label={<label> Auto-Pay with this Credit Card</label>}
                  />
                </Grid.Column>
                <Grid.Column width={2} />
                <Grid.Column width={7}>
                  <Checkbox
                    checked={emailBill === 'yes'}
                    label={<label>Email me monthly billing</label>}
                  />
                </Grid.Column>
              </Grid.Row>
              <Button basic color='orange'>
                Save
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid.Row>
      </Grid>
    )
  }
}

PaymentsInfo.propTypes = {
  paymentData: PropTypes.object,
  allData: PropTypes.object
}

function mapStateToProps (state) {
  let stepsDataArray = state.questionnaireSecondStep.data
  let resultingObj = {}
  if (stepsDataArray.length > 0) {
    stepsDataArray.map(keyVal => {
      let firstSub = Object.keys(keyVal)[0]
        .split(' ')
        .join('_')
      let secondSub = firstSub.split('-').join('_')
      let value = Object.values(keyVal)[0]
      resultingObj[secondSub] = value
    })
  }
  let paymentData = {
    Card_Holder_Name: resultingObj.Card_Holder_Name,
    Billing_Address: resultingObj.Billing_Address,
    Card_Number: resultingObj.Card_Number,
    Expiration: resultingObj.Expiration,
    CVC: resultingObj.CVC,
    autoPay: resultingObj.auto_pay,
    emailBill: resultingObj.email_billing
  }

  return {
    paymentData,
    allData: resultingObj
  }
}

export default connect(mapStateToProps)(PaymentsInfo)
