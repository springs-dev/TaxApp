import { ACTIONS } from '../constants'

function handleActiveCaseActions (state, action) {
  switch (action.type) {
    case ACTIONS.CREATE_CASE:
      return { isFetching: true }
    case ACTIONS.SET_ACTIVE_CASE:
      const caseAll = action.data
      console.log(action)
      return {
        isFetching: false,
        caseAll,
        caseData: caseAll
      }
    default:
      return state
  }
}

function activeCaseReducer (state = {}, action) {
  return Object.assign({}, state, handleActiveCaseActions(state, action))
}

export default activeCaseReducer
