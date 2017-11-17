import { ACTIONS } from '../constants'

function handleSelectedPropertyActions (state, action) {
  switch (action.type) {
    case ACTIONS.ADD_SELECTED_PROPERTY:
      return { isFetching: true }
    case ACTIONS.RECEIVE_SELECTED_PROPERTIES:
      const dataAll = action.response.data
      return {
        isFetching: false,
        dataAll,
        selectedData: dataAll
      }
    case ACTIONS.REMOVE_FORM_SELECTED_PROPERTY:
      const removedData = state.selectedData.filter(
        item => item.pin !== action.pin
      )
      return {
        selectedData: removedData
      }
    default:
      return state
  }
}

function selectedPropertyReducer (state = {}, action) {
  return Object.assign({}, state, handleSelectedPropertyActions(state, action))
}

export default selectedPropertyReducer
