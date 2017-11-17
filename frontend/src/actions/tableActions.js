import CONSTS from '../constants'
import fetchDispatch from './fetchUtils'

const propertyPath = 'property/filter/custom?'
const apiProps = {
  url: '',
  types: {
    request: CONSTS.ACTIONS.REQUEST_PROPERTY_DATA,
    receive: CONSTS.ACTIONS.RECEIVE_PROPERTY_DATA
  }
}

function shouldFetchData ({table}) {
  return (!table.data || !table.isFetching)
}

function fetchData (classCode, neighborhood, squareFootMin, squareFootMax, minAge, maxAge) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      let classCodeQuery = classCode != null ? 'classCode=' + classCode : ''
      let neighborhoodQuery = neighborhood != null ? 'neighborhood=' + neighborhood : ''
      let squareFootMinQuery = squareFootMin != null ? 'squareFootMin=' + squareFootMin : ''
      let squareFootMaxQuery = squareFootMax != null ? 'squareFootMax=' + squareFootMax : ''
      let minAgeQuery = minAge != null ? 'minAge=' + minAge : ''
      let maxAgeQuery = maxAge != null ? 'maxAge=' + maxAge : ''
      apiProps.url = CONSTS.API_URL + propertyPath + classCodeQuery + neighborhoodQuery + squareFootMinQuery +
      squareFootMaxQuery + minAgeQuery + maxAgeQuery
      console.log(apiProps.url)
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

function sortBy (sortKey) {
  return {
    type: CONSTS.ACTIONS.SORT_PROPERTY_DATA,
    sortKey
  }
}

export default { fetchData, filterBy, sortBy }
