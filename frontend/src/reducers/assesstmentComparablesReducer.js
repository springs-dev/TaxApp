import { ACTIONS } from '../constants'

function handleAssesstmentComparableActions (state, action) {
  const assesstment = action.assesstmentComparables
  switch (action.type) {
    case ACTIONS.CALCULATE_ASSESTMENT:
      return {
        subject_property_psfv: assesstment.subject_property_psfv,
        subject_property_square_feet: assesstment.subject_property_square_feet,
        subject_property_land_av: assesstment.subject_property_land_av,
        comparable_bav_avg: assesstment.comparable_bav_avg,
        requested_building_av: assesstment.requested_building_av,
        requested_total_av: assesstment.requested_total_av
      }
    default:
      return state
  }
}

function assesstmentComparableReducer (state = {}, action) {
  return Object.assign({}, state, handleAssesstmentComparableActions(state, action))
}

export default assesstmentComparableReducer
