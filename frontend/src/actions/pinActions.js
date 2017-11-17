import CONSTS from '../constants'
import { fetchDispatch, asyncFetchDispatch } from './fetchUtils'

const query = 'property'
const apiProps = {
  url: '',
  params: {},
  types: {
    request: CONSTS.ACTIONS.REQUEST_SEARCH_PROPERTY,
    receive: CONSTS.ACTIONS.RECEIVE_SEARCH_PROPERTY
  }
}

function shouldFetchData ({ pin }) {
  return !pin.data || !pin.isFetching
}

function fetchData (pin, streetName, streetNumber, city) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = CONSTS.API_URL + query
      apiProps.params = { pin: pin, streetName: streetName, streetNo: streetNumber, city: city }
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function fetchDataById (id) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = CONSTS.API_URL + 'property/id'
      apiProps.types.request = CONSTS.ACTIONS.REQUEST_SINGLE_PROPERTY
      apiProps.types.receive = CONSTS.ACTIONS.RECEIVE_SINGLE_PROPERTY
      apiProps.params = { id: id }
      return dispatch(asyncFetchDispatch(apiProps))
    }
  }
}

function resetPinState () {
  return (dispatch, getState) => {
    return dispatch({
      type: CONSTS.ACTIONS.RESET_PIN_STATE
    })
  }
}

export default { fetchData, fetchDataById, resetPinState }
