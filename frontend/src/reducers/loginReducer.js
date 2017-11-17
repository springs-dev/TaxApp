import { ACTIONS } from '../constants'

function handleLoginActions (state, action) {
  switch (action.type) {
    case ACTIONS.LOG_USER_IN:
      return { isFetching: true }
    case ACTIONS.LOG_USER_OUT:
      localStorage.removeItem('user')
      return {
        logged: false,
        isFetching: false,
        data: {}
      }
    case ACTIONS.USER_LOGIN_FAILED:
      return {
        isFetching: false,
        logged: false,
        loginErrorMessage: action.payload
      }
    case ACTIONS.USER_LOGGED_IN:
      const allData = action.data.data
      localStorage.setItem('user', JSON.stringify(action.data.data))
      localStorage.userToken = action.data.data.token
      return {
        logged: allData.logged,
        isFetching: false,
        allData,
        data: allData
      }
    case ACTIONS.GET_USER_AUTH:
      let user = JSON.parse(localStorage.getItem('user'))
      let loginProps = {}
      if (user) {
        loginProps = {
          logged: user.logged,
          isFetching: false,
          allData,
          data: user
        }
      } else {
        loginProps = {
          logged: false,
          isFetching: false,
          allData,
          data: {}
        }
      }
      return loginProps
    default:
      return state
  }
}

function loginReducer (state = {}, action) {
  return Object.assign({}, state, handleLoginActions(state, action))
}

export default loginReducer
