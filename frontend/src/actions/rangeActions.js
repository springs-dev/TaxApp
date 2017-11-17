import CONSTS from '../constants'

const apiProps = {
  types: {
    updateAge: CONSTS.ACTIONS.UPDATE_AGE_RANGE,
    updateSF: CONSTS.ACTIONS.UPDATE_SF_RANGE
  }
}

function updateAgeRange (min, max, ranges) {
  return (dispatch, getState) => {
    ranges.minAge = min
    ranges.maxAge = max
    return dispatch(Object.assign({ type: apiProps.types.updateAge }, {ranges}))
  }
}

function updateSFRange (min, max, ranges) {
  return (dispatch, getState) => {
    ranges.minSF = min
    ranges.maxSF = max
    return dispatch(Object.assign({ type: apiProps.types.updateSF }, {ranges}))
  }
}

export default { updateAgeRange, updateSFRange }
