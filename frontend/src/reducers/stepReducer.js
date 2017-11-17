import { ACTIONS } from '../constants'

function handleStepActions (state, action) {
  switch (action.type) {
    case ACTIONS.SET_NEXT_STEP_PAGE:
      return { nextPage: action.pageNumber }
    default:
      return state
  }
}

function stepReducer (state = {}, action) {
  return Object.assign({}, state, handleStepActions(state, action))
}

export default stepReducer
