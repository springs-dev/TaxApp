import { ACTIONS } from '../constants'
import axios from 'axios'
// function handleResponse (response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response.json()
//   }
//   throw new Error(formatErrorMessage(response))
// }

// function formatErrorMessage (res) {
//   return `[${res.status}]: ${res.statusText} (${res.url})`
// }

// Error action that is dispatched on failed fetch requests
function errorAction (error) {
  return {
    type: ACTIONS.SET_ERROR_MESSAGE,
    error: true,
    errorMessage: error.message
  }
}

// Generic fetchDispatch utility that dispatches 3 actions:
//  Request, Receive and Error
// @param {object} opts:
//  {
//    url: {string} - url to request
//    types: {
//      request: {string} - constant when fetch begins a request,
//      receive: {string} - constant when fetch has successfully received a request
//    },
//    onReceived: {func(data)} - function to invoke when request has succeeded.
//      It must return a object associated with a successful fetch action.
//      First parameter is the json response. By default, data is return in the object
//      Default success action: {type: opts.types.receive, data: data}
//  }
function fetchDispatch (opts) {
  return dispatch => {
    dispatch({ type: opts.types.request })
    return axios
      .get(opts.url, {
        params: opts.params
      })
      .then(response => {
        // Dispatch the recevied action with type and data
        const obj = opts.onReceived ? opts.onReceived(response) : { response }
        return dispatch(Object.assign({ type: opts.types.receive }, obj))
      })
      .catch(error => dispatch(errorAction(error)))
  }
}

function asyncFetchDispatch (opts) {
  return dispatch => {
    dispatch({ type: opts.types.request })
    return axios
      .get(opts.url, {
        params: opts.params
      })
      .then(response => {
        // Dispatch the recevied action with type and data
        const obj = opts.onReceived ? opts.onReceived(response) : { response }
        if (opts.types.receive === ACTIONS.RECEIVE_SINGLE_PROPERTY) {
          dispatch({ type: ACTIONS.UPDATE_SF_RANGE, ranges: { minSF: parseInt(response.data.building_sq_ft) - 500, maxSF: parseInt(response.data.building_sq_ft) + 500 } })
          dispatch({ type: ACTIONS.UPDATE_AGE_RANGE, ranges: { minAge: parseInt(response.data.age) - 25, maxAge: parseInt(response.data.age) + 25 } })
          dispatch({ type: ACTIONS.UPDATE_TOWNSHIP, filtering: { township: response.data.township } })
          dispatch({ type: ACTIONS.UPDATE_CLASS_CODE, filtering: { classCode: response.data.ovacls } })
        }
        return dispatch(Object.assign({ type: opts.types.receive }, obj))
      })
      .catch(error => dispatch(errorAction(error)))
  }
}

function postDispatch (opts) {
  // const headers = {
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  // }
  return dispatch => {
    dispatch({ type: opts.types.request })
    return (
      axios
        .post(opts.url, opts.params)
        // .then(handleResponse)
        .then(data => {
          // Dispatch the recevied action with type and data
          const obj = opts.onReceived ? opts.onReceived(data) : { data }
          return dispatch(Object.assign({ type: opts.types.receive }, obj))
        })
        .catch(error => {
          return dispatch(errorAction(error))
        })
    )
  }
}

function deleteDispatch (opts) {
  // const headers = {
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
  //   'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
  // }
  return dispatch => {
    dispatch({ type: opts.types.request })
    return (
      axios
        .delete(opts.url, opts.params)
        // .then(handleResponse)
        .then(data => {
          // Dispatch the recevied action with type and data
          const obj = opts.onReceived ? opts.onReceived(data) : { data }
          return dispatch(Object.assign({ type: opts.types.receive }, obj))
        })
        .catch(error => {
          return dispatch(errorAction(error))
        })
    )
  }
}

export default { fetchDispatch, postDispatch, asyncFetchDispatch, deleteDispatch }
