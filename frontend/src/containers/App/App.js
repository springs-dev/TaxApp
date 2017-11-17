import './App.styl'
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { resetErrorMessage, getUserAuth } from '../../actions'
// import PropertyDetailPage from '../PropertyDetailPage'
import RoutesApp from '../../components/Routes/RouteApp'
import { Grid, Image } from 'semantic-ui-react'
import 'react-input-range/lib/css/index'

// import GuestRoute from '../../components/Routes/GuestRoute'

class App extends React.Component {
  componentWillMount () {
    this.props.getUserAuth()
  }
  handleDismissClick () {
    return e => {
      e.preventDefault()
      this.props.resetErrorMessage()
    }
  }

  renderErrorMessage () {
    const { errorMessage } = this.props
    if (!errorMessage) return null

    return (
      <p className='error'>
        {errorMessage}
        <span className='close' onClick={this.handleDismissClick()}>
          &#x2718;
        </span>
      </p>
    )
  }

  render () {
    const { loggedIn, registered } = this.props
    return (
      <BrowserRouter>
        <Route
          render={props => (
            <RoutesApp
              location={props.location}
              loggedIn={loggedIn || registered}
            />
          )}
        />
      </BrowserRouter>
    )
  }
}

// {/* <Route path='/property/detail' exact component={PropertyDetailPage} /> */}

App.propTypes = {
  errorMessage: PropTypes.any,
  resetErrorMessage: PropTypes.func,
  getUserAuth: PropTypes.func,
  loggedIn: PropTypes.any.isRequired,
  registered: PropTypes.bool.isRequired
}

export default connect(
  state => ({
    errorMessage: state.errorMessage,
    loggedIn: !!state.loginProps.data.token,
    registered: !!state.registerUserProps.data.token
  }),
  { resetErrorMessage: resetErrorMessage, getUserAuth: getUserAuth }
)(App)
