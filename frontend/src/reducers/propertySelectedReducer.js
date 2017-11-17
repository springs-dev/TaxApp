import { ACTIONS } from '../constants'

function handlePropertySelectedActions (state, action) {
  switch (action.type) {
    case ACTIONS.REQUEST_SINGLE_PROPERTY:
      return { isFetching: true }
    case ACTIONS.RECEIVE_SINGLE_PROPERTY:
      const data = action.response.data
      return {
        isFetching: false,
        data
      }
    case ACTIONS.RESET_PIN_STATE:
      return {
        data: []
      }
    default:
      return state
  }
}

function propertySelectedReducer (state = {}, action) {
  return Object.assign({}, state, handlePropertySelectedActions(state, action))
}

export default propertySelectedReducer
