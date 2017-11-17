import { ACTIONS } from '../constants'

function handleRangeActions (state, action) {
  switch (action.type) {
    case ACTIONS.SET_RANGE:
      return { isFetching: true }
    case ACTIONS.UPDATE_AGE_RANGE:
      const ranges = action.ranges
      return {
        minAge: ranges.minAge,
        maxAge: ranges.maxAge
      }
    case ACTIONS.UPDATE_SF_RANGE:
      const rangesSF = action.ranges
      return {
        minSF: rangesSF.minSF,
        maxSF: rangesSF.maxSF
      }
    default:
      return state
  }
}

function rangeReducer (state = {}, action) {
  return Object.assign({}, state, handleRangeActions(state, action))
}

export default rangeReducer
