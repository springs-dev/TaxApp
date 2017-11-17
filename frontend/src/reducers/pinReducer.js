import { ACTIONS } from '../constants'

function handlePinActions (state, action) {
  switch (action.type) {
    case ACTIONS.REQUEST_SEARCH_PROPERTY:
      return { isFetching: true }
    case ACTIONS.RECEIVE_SEARCH_PROPERTY:
      const allData = action.response.data
      return {
        isFetching: false,
        allData,
        data: allData
      }
    case ACTIONS.RESET_PIN_STATE:
      return {
        allData: [],
        data: []
      }
    default:
      return state
  }
}

function pinReducer (state = {}, action) {
  return Object.assign({}, state, handlePinActions(state, action))
}

export default pinReducer
