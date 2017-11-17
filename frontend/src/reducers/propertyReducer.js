import { ACTIONS } from '../constants'
import _ from "lodash"

export function filterPropertiesForAssesstmentComparables (data) {
  const properties = data
  return properties
}

export function objectContains (str) {
  return obj => {
    return (obj.STREET + obj.PIN + obj.HOUSENO).toLowerCase().includes(str)
  }
}

export function filter (data, filterString) {
  return filterString !== '' ? data.filter(objectContains(filterString)) : data
}

export function sort (data, sortKey, sortDesc) {
  const multiplier = sortDesc ? -1 : 1
  return data.sort((a, b) => {
    const aVal = a[sortKey] || 0
    const bVal = b[sortKey] || 0
    return aVal > bVal ? multiplier : aVal < bVal ? -multiplier : 0
  })
}

function comparer (otherArray) {
  return function (current) {
    return (
      otherArray.filter(function (other) {
        return other.pin === current.pin
      }).length === 0
    )
  }
}

function handleTableActions (state, action) {
  switch (action.type) {
    case ACTIONS.REQUEST_PROPERTY_DATA:
      return { isFetching: true }
    case ACTIONS.RECEIVE_PROPERTY_DATA:
      const allData = sort(
        filterPropertiesForAssesstmentComparables(action.response.data),
        state.sortKey,
        state.sortDesc
      )
      return {
        isFetching: false,
        allData,
        data: filter(allData, state.filterString)
      }
    case ACTIONS.RECEIVE_SELECTED_PROPERTIES:
      const selectedProperties = action.response.data
      const allReceivedProperties = state.allData
      let diff1 = selectedProperties.filter(comparer(allReceivedProperties))
      let diff2 = allReceivedProperties.filter(comparer(selectedProperties))
      let result = diff1.concat(diff2)
      return {
        data: result
      }
    case ACTIONS.FILTER_PROPERTY_DATA:
      return {
        filterString: action.filterString.toLowerCase(),
        data: filter(state.allData, action.filterString)
      }
    case ACTIONS.APPEND_TO_PROPERTY: {
      let currentData = state.data
      currentData.push(action.property)
      return {
        allData: currentData,
        data: currentData
      }
    }
    case ACTIONS.SORT_PROPERTY_DATA:
      const sortKey = action.payload.sortKey
      const sortDesc =
        state.sortKey === action.payload.sortKey ? !state.sortDesc : false
      // const sorted = sort(state.allData, sortKey, sortDesc)

      return {
        sortKey,
        sortDesc,
        direction: action.payload.direction
        // allData: sorted,
        // data: filter(sorted, state.filterString)
      }
    case ACTIONS.UPDATE_PROPERTIES_BY_AGE_RANGES: {
      const { minAge, maxAge } = action.ranges
      let currentProperties = state.allData
      let newProperties = _.filter(currentProperties, o => (o.age >= minAge && o.age <= maxAge))
      return {
        data: newProperties
      }
    }
    case ACTIONS.UPDATE_PROPERTIES_BY_SF_RANGES: {
      const { minSf, maxSf } = action.ranges
      let currentProperties = state.allData
      let newProperties = _.filter(currentProperties, o => (o.building_sq_ft >= minSf && o.building_sq_ft <= maxSf))
      return {
        data: newProperties
      }
    }
    default:
      return state
  }
}

function propertyReducer (state = {}, action) {
  return Object.assign({}, state, handleTableActions(state, action))
}

export default propertyReducer
