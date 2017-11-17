import React, { Component } from 'react'
import { Checkbox, Form, Grid, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { questionarrieActions, stepActions } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Field, reduxForm } from 'redux-form'

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} />
      {touched &&
        ((error && <span style={{ color: 'red' }}>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const requiredField = value => (value ? undefined : 'This field is required')
const requiredNumberField = value =>
  value && isNaN(Number(value)) ? 'You must enter a number' : undefined
const requiredEmailField = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

class ContactInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      value: ''
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ name, value })
    this.props.actions.setQuestionThirdLevel(name, value)
  }

  handleCheckbox = (e, { name, checked }) => {
    let value = checked ? 'yes' : 'no'
    this.props.actions.setQuestionThirdLevel(name, value)
  }

  render () {
    const { handleSubmit } = this.props
    return (
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={4} />
          <Grid.Column width={8}>
            <Form onSubmit={handleSubmit}>
              <Field
                name='Email'
                type='email'
                label='Email'
                component={renderField}
                validate={[requiredField, requiredEmailField]}
              />
              <Field
                name='Phone'
                type='text'
                label='Phone'
                component={renderField}
                validate={[requiredField, requiredNumberField]}
              />
              <Field
                name='Card_holder_name'
                type='text'
                label='Card Holder Name'
                component={renderField}
                validate={[requiredField]}
              />
              <Field
                name='Billing_address'
                type='text'
                label='Billing address'
                component={renderField}
                validate={[requiredField]}
              />
              <Field
                name='Card_num'
                type='number'
                label='Card number'
                component={renderField}
                validate={[requiredField, requiredNumberField]}
              />
              <Form.Group widths='equal'>
                <Field
                  name='Expiration'
                  type='text'
                  label='Expiration (MM/YYYY)'
                  component={renderField}
                  validate={[requiredField, requiredNumberField]}
                />
                <Field
                  name='CVC'
                  type='number'
                  label='CVC'
                  component={renderField}
                  validate={[requiredField, requiredNumberField]}
                />
              </Form.Group>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

ContactInfo.propTypes = {
  actions: PropTypes.any,
  handleSubmit: PropTypes.func,
  formData: PropTypes.any
}

const mapStateToProps = state => {
  return {
    formData: state.form.contactInfoForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign({}, questionarrieActions, stepActions),
      dispatch
    )
  }
}

const ContactInfoForm = reduxForm({
  form: 'contactInfoForm'
})(connect(mapStateToProps, mapDispatchToProps)(ContactInfo))

export default ContactInfoForm
