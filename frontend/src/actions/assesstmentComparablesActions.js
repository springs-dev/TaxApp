import CONSTS from '../constants'

const apiProps = {
  types: {
    request: CONSTS.ACTIONS.CALCULATE_ASSESTMENT
  }
}

function calculateData (caseProperty, selectedProperties, assesstmentComparables) {
  return (dispatch, getState) => {
    let bavSum = 0
    for (let i = 0, len = selectedProperties.length; i < len; i++) {
      bavSum = bavSum + parseFloat(selectedProperties[i].bldpsfv)
    }
    let averageBav = bavSum / selectedProperties.length
    let requestedBuildingAv = caseProperty.bldpsfv * averageBav
    let requestedTotalAv = parseFloat(requestedBuildingAv) + parseFloat(caseProperty.land_sq_ft)
    assesstmentComparables.subject_property_psfv = caseProperty.bldpsfv
    assesstmentComparables.subject_property_square_feet = caseProperty.building_sq_ft
    assesstmentComparables.subject_property_land_av = caseProperty.land_sq_ft
    assesstmentComparables.comparable_bav_avg = averageBav
    assesstmentComparables.requested_building_av = requestedBuildingAv
    assesstmentComparables.requested_total_av = requestedTotalAv
    return dispatch(Object.assign({ type: apiProps.types.request }, {assesstmentComparables}))
  }
}

export default { calculateData }
