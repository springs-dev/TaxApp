import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const GuestRoute = ({
  isAuthenticated,
  isRegistered,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !isRegistered ? (
        <Component {...props} />
      ) : (
        <Redirect to='/taxappeal/' />
      )}
  />
)

GuestRoute.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isRegistered: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  return {
    isAuthenticated: !!state.loginProps.data.token,
    isRegistered: !!state.registerUserProps.data.token
  }
}

export default connect(mapStateToProps, {})(GuestRoute)
