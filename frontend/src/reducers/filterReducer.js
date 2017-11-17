import { ACTIONS } from '../constants'

function handleFilterActions (state, action) {
  const filter = action.filtering
  switch (action.type) {
    case ACTIONS.UPDATE_CLASS_CODE:
      return {
        classCode: filter.classCode
      }
    case ACTIONS.UPDATE_TOWNSHIP:
      return {
        township: filter.township
      }
    default:
      return state
  }
}

function filterReducer (state = {}, action) {
  return Object.assign({}, state, handleFilterActions(state, action))
}

export default filterReducer
