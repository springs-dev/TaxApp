import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import InlineError from '../Login/InlineError'

class RegisterUserForm extends React.Component {
  state = {
    data: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    loading: false,
    errors: {}
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    })

  onSubmit = () => {
    this.props.submit(this.state.data)
    const errors = this.validate(this.state.data)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true })
      this.props
        .submit(this.state.data)
        .then(user => {
          if (!this.props.logged) {
            // registered prop from store
            this.setState({
              loading: false,
              errors: {
                firstName: this.props.errorMessage,
                lastName: this.props.errorMessage
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.setState({
            errors: {
              firstName: 'Something wrong',
              lastMame: 'Something wrong',
              email: 'Something wrong',
              password: 'Something wrong',
              confirmPassword: 'Something wrong'
            }
          })
        })
    }
  }

  validate = data => {
    const errors = {}
    if (!data.firstName) errors.firstName = 'Cannot be empty'
    if (!data.lastMame) errors.lastMame = 'Cannot be empty'
    // Dodati ostale validacije tipa: provjera emaila
    return errors
  }

  render () {
    const { data, errors, loading } = this.state
    return (
      <div className='ui container center' style={{ width: 300 }}>
        <Form onSubmit={this.onSubmit} loading={loading}>
          {errors.global && (
            <Message negative>
              <Message.Header>
                <p>{errors.global}</p>
              </Message.Header>
            </Message>
          )}
          <Form.Field error={!!errors.firstName}>
            <label htmlFor='firstName'>First name</label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              placeholder='Your first name'
              value={data.firstName}
              onChange={this.onChange}
            />
            {errors.firstName && <InlineError text={errors.firstName} />}
          </Form.Field>
          <Form.Field error={!!errors.lastName}>
            <label htmlFor='lastName'>Last name</label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Your name'
              value={data.lastName}
              onChange={this.onChange}
            />
            {errors.lastName && <InlineError text={errors.lastName} />}
          </Form.Field>
          <Form.Field error={!!errors.email}>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              name='email'
              placeholder='Your email'
              value={data.email}
              onChange={this.onChange}
            />
            {errors.email && <InlineError text={errors.email} />}
          </Form.Field>
          <Form.Field error={!!errors.password}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Your password'
              value={data.password}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          <Form.Field error={!!errors.confirmPassword}>
            <label htmlFor='confirmPassword'>Confirm password</label>
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              placeholder='Confirm your password'
              value={data.confirmPassword}
              onChange={this.onChange}
            />
            {errors.confirmPassword && (
              <InlineError text={errors.confirmPassword} />
            )}
          </Form.Field>
          <Button primary>Sign up</Button>
          <Button
            content='Already have account?'
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              this.props.haveAccount(true)
            }}
          />
        </Form>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    logged: state.loginProps.logged,
    errorMessage: state.loginProps.loginErrorMessage
  }
}

RegisterUserForm.propTypes = {
  submit: PropTypes.func.isRequired,
  logged: PropTypes.bool,
  errorMessage: PropTypes.string,
  haveAccount: PropTypes.func
}

export default connect(mapStateToProps)(RegisterUserForm)
