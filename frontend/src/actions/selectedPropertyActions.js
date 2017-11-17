import CONSTS from '../constants'
import { fetchDispatch, deleteDispatch } from './fetchUtils'

const apiProps = {
  url: '',
  params: {},
  types: {
    request: '',
    receive: ''
  }
}
function shouldFetchData ({ selectedProperties }) {
  return true
}

function fetchSelectedProperties (id) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = CONSTS.API_URL + 'case/property/get'
      apiProps.types.request = CONSTS.ACTIONS.ADD_SELECTED_PROPERTY
      apiProps.types.receive = CONSTS.ACTIONS.RECEIVE_SELECTED_PROPERTIES
      apiProps.params = { caseId: id }
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function selectProperty (propertyId, caseId) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = CONSTS.API_URL + 'case/property'
      apiProps.types.request = CONSTS.ACTIONS.ADD_SELECTED_PROPERTY
      apiProps.types.receive = CONSTS.ACTIONS.RECEIVE_SELECTED_PROPERTIES
      apiProps.params = { propertyId: propertyId, caseId: caseId }
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function removeFromSelectedProperty (pin) {
  return (dispatch, getState) => {
    return dispatch({
      type: CONSTS.ACTIONS.REMOVE_FORM_SELECTED_PROPERTY,
      pin
    })
  }
}

function deleteFromSelectedProperty (pin) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = CONSTS.API_URL + 'case/property?id=' + pin
      apiProps.types.request = CONSTS.ACTIONS.DELETE_SELECTED_PROPERTY
      apiProps.types.receive = CONSTS.ACTIONS.DELETE_PROPERTIES_SUCCESS
      return dispatch(deleteDispatch(apiProps))
    }
  }
}

export default {
  fetchSelectedProperties,
  selectProperty,
  removeFromSelectedProperty,
  deleteFromSelectedProperty
}
