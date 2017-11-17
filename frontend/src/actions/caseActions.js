import CONSTS from '../constants'
import { fetchDispatch } from './fetchUtils'

const query = 'cases'
const createQuery = 'case'
const updateQuery = 'case/petitioner'
const allQuery = 'cases/all'
const apiProps = {
  url: '',
  params: {},
  types: {
    request: CONSTS.ACTIONS.CREATE_CASE,
    receive: CONSTS.ACTIONS.RECEIVE_CASE
  }
}
function shouldFetchData ({ cases }) {
  return !cases.caseData || !cases.isFetching
}

function fetchCaseData (caseId) {
  let apiPropsFetch = {
    url: '',
    params: {},
    types: {
      request: CONSTS.ACTIONS.REQUEST_CASE,
      receive: CONSTS.ACTIONS.RECEIVE_CASE
    }
  }
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiPropsFetch.url = CONSTS.API_URL + query
      apiPropsFetch.params = { caseId: caseId }
      return dispatch(fetchDispatch(apiPropsFetch))
    }
  }
}

function setActiveCase (cases) {
  console.log('in the zone')
  return dispatch => {
    dispatch({ type: CONSTS.ACTIONS.SET_ACTIVE_CASE, data: cases })
  }
}

function fetchAllCases () {
  let apiPropsFetch = {
    url: '',
    params: {},
    types: {
      request: CONSTS.ACTIONS.REQUEST_ALL_CASES,
      receive: CONSTS.ACTIONS.RECEIVE_ALL_CASES
    }
  }
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiPropsFetch.url = CONSTS.API_URL + allQuery
      return dispatch(fetchDispatch(apiPropsFetch))
    }
  }
}
function openCase (propertyId) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = CONSTS.API_URL + createQuery
      apiProps.params = { propertyId: propertyId }
      return dispatch(fetchDispatch(apiProps))
    }
  }
}
function updateData (propertyId, firstName, lastName, address, email, city, state, zip, phone, status) {
  return (dispatch, getState) => {
    apiProps.url = CONSTS.API_URL + updateQuery
    apiProps.params = {
      propertyId: propertyId,
      firstName: firstName,
      lastName: lastName,
      address: address,
      email: email,
      city: city,
      state: state,
      zip: zip,
      phone: phone,
      status: status
    }
    return dispatch(fetchDispatch(apiProps))
  }
}

export default { fetchCaseData, fetchAllCases, updateData, openCase, setActiveCase }
