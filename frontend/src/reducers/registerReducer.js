import { ACTIONS } from '../constants'

function handleRegisterActions (state, action) {
  switch (action.type) {
    case ACTIONS.REGISTER_NEW_USER:
      return { isFetching: true }
    case ACTIONS.REGISTER_NEW_USER_SUCCESS:
      const data = action.data.data
      let localStorage = {}
      localStorage.userToken = data.token
      return {
        logged: data.logged,
        isFetching: false,
        data: data
      }
    case ACTIONS.LOG_USER_OUT:
      return {
        logged: false,
        isFetching: false,
        data: {}
      }
    default:
      return state
  }
}

function registerReducer (state = {}, action) {
  return Object.assign({}, state, handleRegisterActions(state, action))
}

export default registerReducer
