import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import InlineError from './InlineError'

class LoginForm extends React.Component {
  state = {
    data: {
      username: '',
      password: ''
    },
    loading: false,
    errors: {}
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    })

  onSubmit = () => {
    const errors = this.validate(this.state.data)
    this.setState({ errors })
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true })
      this.props
        .submit(this.state.data)
        .then(user => {
          if (!this.props.logged) {
            this.setState({
              loading: false,
              errors: {
                username: this.props.errorMessage,
                password: this.props.errorMessage
              }
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.setState({
            errors: { username: 'Something wrong', password: 'Something wrong' }
          })
        })
    }
  }

  validate = data => {
    const errors = {}
    if (!data.username) errors.username = 'Cannot be empty'
    if (!data.password) errors.password = 'Cannot be empty'
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
          <Form.Field error={!!errors.username}>
            <label htmlFor='password'>Username</label>
            <input
              type='text'
              id='username'
              name='username'
              placeholder='Enter your username'
              value={data.username}
              onChange={this.onChange}
            />
            {errors.password && <InlineError text={errors.password} />}
          </Form.Field>
          <Form.Field error={!!errors.password}>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='Enter your password'
              value={data.password}
              onChange={this.onChange}
            />
            {errors.username && <InlineError text={errors.password} />}
          </Form.Field>
          <Button primary>Login</Button>
          <Button
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              this.props.dontHaveAccount(true)
            }}
          >
            Sign up here!
          </Button>
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

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  logged: PropTypes.bool,
  errorMessage: PropTypes.string,
  dontHaveAccount: PropTypes.func
}

export default connect(mapStateToProps)(LoginForm)
