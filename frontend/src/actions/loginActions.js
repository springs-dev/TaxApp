import CONSTS from '../constants'
import { postDispatch } from '../actions/fetchUtils'

const loginPath = 'user/auth'
const apiProps = {
  url: '',
  params: {},
  types: {
    request: CONSTS.ACTIONS.LOG_USER_IN,
    receive: CONSTS.ACTIONS.USER_LOGGED_IN
  }
}

function shouldFetchData ({ login }) {
  return true
}

function logUserIn (data) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = CONSTS.API_URL + loginPath
      apiProps.params = {
        username: data.username,
        password: data.password
      }
    }
    return dispatch(postDispatch(apiProps))
  }
}

function logUserOut () {
  // waiting for api
  /*
  apiProps.url = ...
  */
  return (dispatch, getState) => {
    return dispatch({ type: CONSTS.ACTIONS.LOG_USER_OUT })
  }
}

function userLoginFailed (res) {
  return (dispatch, getState) => {
    return dispatch({
      type: CONSTS.ACTIONS.USER_LOGIN_FAILED,
      payload: res.message
    })
  }
}

export default { logUserIn, logUserOut, userLoginFailed }
