import { ACTIONS } from '../constants'

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
    case ACTIONS.FILTER_PROPERTY_DATA:
      return {
        filterString: action.filterString.toLowerCase(),
        data: filter(state.allData, action.filterString)
      }
    case ACTIONS.SORT_PROPERTY_DATA:
      const sortKey = action.sortKey
      const sortDesc =
        state.sortKey === action.sortKey ? !state.sortDesc : false
      // const sorted = sort(state.allData, sortKey, sortDesc)

      return {
        sortKey,
        sortDesc
        // allData: sorted,
        // data: filter(sorted, state.filterString)
      }
    default:
      return state
  }
}

function tableReducer (state = {}, action) {
  return Object.assign({}, state, handleTableActions(state, action))
}

export default tableReducer
