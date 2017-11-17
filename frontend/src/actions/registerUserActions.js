import CONSTS from '../constants'
import { postDispatch } from '../actions/fetchUtils'

const registerPath = 'user/register'
const apiProps = {
  url: '',
  params: {},
  types: {
    request: CONSTS.ACTIONS.REGISTER_NEW_USER,
    receive: CONSTS.ACTIONS.REGISTER_NEW_USER_SUCCESS
  }
}

function shouldFetchData ({ registerUserProps }) {
  return true
}

function registerNewUser (data) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = CONSTS.API_URL + registerPath // change later, and add params
      apiProps.params = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword
      }
    }
    return dispatch(postDispatch(apiProps))
  }
}

export default { registerNewUser }
