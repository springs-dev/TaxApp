import CONSTS from '../constants'
import { fetchDispatch } from './fetchUtils'

const propertyPath = 'property/filter/custom'
const apiProps = {
  url: '',
  params: {},
  types: {
    request: CONSTS.ACTIONS.REQUEST_PROPERTY_DATA,
    receive: CONSTS.ACTIONS.RECEIVE_PROPERTY_DATA
  }
}

function shouldFetchData ({ property }) {
  return !property.data || !property.isFetching
}

// const obj = opts.onReceived ? opts.onReceived(data) : { data }
// return dispatch(Object.assign({ type: opts.types.receive }, obj))

function fetchaData (
  township,
  classCode,
  neighborhood,
  squareFootMin,
  squareFootMax,
  minAge,
  maxAge
) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = CONSTS.API_URL + propertyPath
      apiProps.params = {
        township: township,
        classCode: classCode,
        neighborhood: neighborhood,
        squareFootMin: squareFootMin,
        squareFootMax: squareFootMax,
        minAge: minAge,
        maxAge: maxAge
      }
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function filterBy (filterString) {
  return {
    type: CONSTS.ACTIONS.FILTER_PROPERTY_DATA,
    filterString
  }
}

/*
function sortBy (sortKey) {
  return {
    type: CONSTS.ACTIONS.SORT_PROPERTY_DATA,
    sortKey
  }
}
*/

function sortBy (sortKey, direction) {
  return dispatch => {
    dispatch({
      type: CONSTS.ACTIONS.SORT_PROPERTY_DATA,
      payload: { sortKey, direction }
    })
  }
}

function updateByAgeRanges (minAge, maxAge) {
  return dispatch => {
    dispatch({
      type: CONSTS.ACTIONS.UPDATE_PROPERTIES_BY_AGE_RANGES,
      ranges: {
        minAge,
        maxAge
      }
    })
  }
}

function updateBySfRanges (minSf, maxSf) {
  return dispatch => {
    dispatch({
      type: CONSTS.ACTIONS.UPDATE_PROPERTIES_BY_SF_RANGES,
      ranges: {
        minSf,
        maxSf
      }
    })
  }
}

function appendToProperties (property) {
  return (dispatch, getState) => {
    return dispatch({
      type: CONSTS.ACTIONS.APPEND_TO_PROPERTY,
      property
    })
  }
}

export default { fetchaData, filterBy, sortBy, appendToProperties, updateByAgeRanges, updateBySfRanges }
