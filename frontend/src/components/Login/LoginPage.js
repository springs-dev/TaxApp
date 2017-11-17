import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import RegisterUserForm from '../../components/Register/RegisterUserForm'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import {
  loginActions as login,
  registerUserActions as register
} from '../../actions'
import { withRouter } from 'react-router-dom'

class LoginPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      haveAccount: true
    }
  }

  submit = data => {
    return this.props
      .logUserIn(data)
      .then(user => {
        if (user.errorMessage && user.errorMessage.includes('404')) {
          this.props.userLoginFailed({
            message: 'Invalid credentials (username/password)'
          })
        }
        if (user.data.status && user.data.status === 200) {
          this.props.history.push('/taxappeal/home')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  registerUser = data => {
    return this.props
      .registerNewUser(data)
      .then(user => {
        if (user.data && user.data.status === 200) {
          this.props.history.push('/taxappeal/dashboard')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  haveAccount = status => this.setState({ haveAccount: status })
  dontHaveAccount = status => this.setState({ haveAccount: !status })

  render () {
    return (
      <div className='ui container center'>
        <h1>Log in</h1>
        {this.state.haveAccount && (
          <LoginForm
            submit={this.submit}
            dontHaveAccount={this.dontHaveAccount}
          />
        )}
        {!this.state.haveAccount && (
          <div>
            <RegisterUserForm
              submit={this.registerUser}
              haveAccount={this.haveAccount}
            />
          </div>
        )}
      </div>
    )
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  logUserIn: PropTypes.func,
  registerNewUser: PropTypes.func,
  userLoginFailed: PropTypes.func
}

function mapStateToProps (state) {
  return {
    loginProps: state.loginProps
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, login, register), dispatch)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage)
)
