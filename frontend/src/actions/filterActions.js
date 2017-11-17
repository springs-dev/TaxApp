import CONSTS from '../constants'

const apiProps = {
  types: {
    updateClasCode: CONSTS.ACTIONS.UPDATE_CLASS_CODE,
    updateTownship: CONSTS.ACTIONS.UPDATE_TOWNSHIP
  }
}

function updateClassCode (oldClassCode, newClassCode, filtering) {
  return (dispatch, getState) => {
    filtering.classCode = oldClassCode + ',' + newClassCode
    return dispatch(Object.assign({ type: apiProps.types.updateClasCode }, {filtering}))
  }
}
function updateTownship (oldTownship, newTownship, filtering) {
  return (dispatch, getState) => {
    filtering.township = oldTownship + ',' + newTownship
    return dispatch(Object.assign({ type: apiProps.types.updateTownship }, {filtering}))
  }
}

export default { updateClassCode, updateTownship }
