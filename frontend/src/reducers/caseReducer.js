import { ACTIONS } from '../constants'

function handleCaseActions (state, action) {
  switch (action.type) {
    case ACTIONS.CREATE_CASE:
      return { isFetching: true }
    case ACTIONS.REQUEST_ALL_CASES:
      return {
        isFetching: true,
        caseData: []
      }
    case ACTIONS.RECEIVE_CASE:
      const caseAll = action.response.data
      return {
        isFetching: false,
        caseAll,
        caseData: caseAll
      }
    case ACTIONS.RECEIVE_ALL_CASES:
      const caseDataAll = action.response.data
      return {
        isFetching: false,
        caseAll,
        caseData: caseDataAll
      }
    default:
      return state
  }
}

function caseReducer (state = {}, action) {
  return Object.assign({}, state, handleCaseActions(state, action))
}

export default caseReducer
