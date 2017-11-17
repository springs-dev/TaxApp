import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import logUserOut from '../../actions/loginActions'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

const trigger = email => (
  <span>
    <Icon name='user' /> {email}
  </span>
)

const options = email => {
  return [
    {
      key: 'menu',
      text: (
        <span>
          <strong>{email}</strong>
        </span>
      ),
      disabled: true
    },
    { key: 'profile', text: 'Your Profile', value: 'profile' },
    { key: 'security', text: 'Security' },
    { key: 'help', text: 'Help' },
    { key: 'settings', text: 'Settings' },
    { key: 'sign-out', text: 'Sign Out', value: 'Sign out' }
  ]
}

class UserMenu extends React.Component {
  handleDropdownChange = (e, result) => {
    switch (result.value) {
      case 'Sign out': {
        this.props.logUserOut()
        break
      }
      default: {
        break
      }
    }
  }
  render () {
    const { email } = this.props
    return (
      <Dropdown
        trigger={trigger(email)}
        onChange={this.handleDropdownChange}
        options={options(email)}
      />
    )
  }
}

UserMenu.propTypes = {
  email: PropTypes.string,
  logUserOut: PropTypes.func.isRequired
  /* history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired */
}

function mapStateToProps (state) {
  let result =
    state.loginProps.data.username || state.registerUserProps.data.email
  return {
    email: result
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(Object.assign({}, logUserOut), dispatch)

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserMenu)
)
