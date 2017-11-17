import React, { Component } from 'react'
import { Checkbox, Form, Grid, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { questionarrieActions } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
// User contact info 
class ContactInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      value: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    console.log('Next props: ', nextProps)
  }

  handleChange = (e, { name, value }) => {
    this.setState({ name, value })
    this.props.actions.setQuestionThirdLevel(name, value)
  }

  handleCheckbox = (e, { name, checked }) => {
    let value = checked ? 'yes' : 'no'
    this.props.actions.setQuestionThirdLevel(name, value)
  }

  handleSignIn = values => {
    console.log('Submitet redux form values: ', values)
  }

  render () {
    return (
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={4} />
          <Grid.Column width={8}>
            <Form>
              <Form.Input
                id='form-input-control-email'
                name='Email'
                label='Email'
                placeholder='Email'
                onChange={this.handleChange}
              />
              <Form.Input
                id='form-input-control-phone'
                name='Phone'
                label='Phone'
                placeholder='Phone'
                onChange={this.handleChange}
              />
              <Form.Input
                id='form-input-control-ch-name'
                name='Card Holder Name'
                label='Card Holder Name *'
                placeholder='Card Holder Name'
                onChange={this.handleChange}
              />
              <Form.Input
                id='form-input-control-first-name'
                name='Billing Address'
                label='Billing Address'
                placeholder='Billing Address'
                onChange={this.handleChange}
              />
              <Form.Input
                id='form-input-control-first-name'
                name='Card Number'
                label='Card Number *'
                placeholder='Card Number'
                onChange={this.handleChange}
              />
              <Form.Group>
                <Form.Input
                  width={9}
                  id='form-input-control-first-exp'
                  name='Expiration'
                  label='Expiration(MM/YYYY) *'
                  placeholder='Expiration(MM/YYYY)'
                  onChange={this.handleChange}
                />
                <Form.Input
                  width={7}
                  id='form-input-control-first-cvc'
                  name='CVC'
                  label='CVC *'
                  placeholder='CVC'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Field label='Payment Options *' />

              <Grid.Row>
                <Grid.Column width={7}>
                  <Checkbox
                    label={<label> Auto-Pay with this Credit Card</label>}
                    name={'auto-pay'}
                    onChange={this.handleCheckbox}
                  />
                </Grid.Column>
                <Grid.Column width={2} />
                <Grid.Column width={7}>
                  <Checkbox
                    label={<label>Email me monthly billing</label>}
                    name={'email-billing'}
                    onChange={this.handleCheckbox}
                  />
                </Grid.Column>
              </Grid.Row>
              <Button primary>Submit redux</Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid.Row>
      </Grid>
    )
  }
}

ContactInfo.propTypes = {
  actions: PropTypes.any
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign({}, questionarrieActions),
      dispatch
    )
  }
}

ContactInfo = reduxForm({
  form: 'contactInfoForm'
})(connect(null, mapDispatchToProps)(ContactInfo))

export default ContactInfo
