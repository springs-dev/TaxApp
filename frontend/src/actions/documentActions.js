import CONSTS from '../constants'
import { fetchDispatch } from './fetchUtils'

const apiProps = {
  url: '',
  params: {},
  types: {}
}

// function generateDocument (type, params) {
//   return (dispatch, getState) => {
//     let query = 'document/generate'
//     apiProps.url = CONSTS.API_URL + query
//     params.documentType = type
//     switch (type) {
//       case 'rereview':
//         apiProps.types.request = CONSTS.ACTIONS.REQUEST_DOCUMENT_GENERATE
//         apiProps.types.receive = CONSTS.ACTIONS.RECEIVE_REREVIEW_DOCUMENT_GENERATE
//         apiProps.params = params
//         break
//       case 'resappeal':
//         apiProps.types.request = CONSTS.ACTIONS.REQUEST_RESAPPEAL_DOCUMENT_GENERATE
//         apiProps.types.receive = CONSTS.ACTIONS.RECEIVE_RESAPPEAL_DOCUMENT_GENERATE
//         apiProps.params = params
//         break
//       case 'complaint':
//         apiProps.types.request = CONSTS.ACTIONS.REQUEST_COMPLAINT_DOCUMENT_GENERATE
//         apiProps.types.receive = CONSTS.ACTIONS.RECEIVE_COMPLAINT_DOCUMENT_GENERATE
//         apiProps.params = params
//         break
//       default:
//         break
//     }
//     console.log(apiProps.url)
//     return dispatch(fetchDispatch(apiProps))
//   }
// }

function generateComplaintDocument (type, params) {
  const apiPropsComplaint = {
    url: '',
    params: {},
    types: {}
  }
  return (dispatch, getState) => {
    let query = 'document/generate'
    apiPropsComplaint.url = CONSTS.API_URL + query
    params.documentType = type
    apiPropsComplaint.types.request = CONSTS.ACTIONS.REQUEST_COMPLAINT_DOCUMENT_GENERATE
    apiPropsComplaint.types.receive = CONSTS.ACTIONS.RECEIVE_COMPLAINT_DOCUMENT_GENERATE
    apiPropsComplaint.params = params
    console.log(apiPropsComplaint.url)
    return dispatch(fetchDispatch(apiPropsComplaint))
  }
}
function generateResapealDocument (type, params) {
  const apiPropsResapeal = {
    url: '',
    params: {},
    types: {}
  }
  return (dispatch, getState) => {
    let query = 'document/generate'
    apiPropsResapeal.url = CONSTS.API_URL + query
    params.documentType = type
    apiPropsResapeal.types.request = CONSTS.ACTIONS.REQUEST_RESAPPEAL_DOCUMENT_GENERATE
    apiPropsResapeal.types.receive = CONSTS.ACTIONS.RECEIVE_RESAPPEAL_DOCUMENT_GENERATE
    apiPropsResapeal.params = params
    console.log(apiPropsResapeal.url)
    return dispatch(fetchDispatch(apiPropsResapeal))
  }
}

function generateExcelDocument (type, params) {
  return (dispatch, getState) => {
    let query = 'document/generate/excel'
    apiProps.url = CONSTS.API_URL + query
    apiProps.types.request = CONSTS.ACTIONS.REQUEST_CALCULATION_EXCEL_DOCUMENT
    apiProps.types.receive = CONSTS.ACTIONS.RECEIVE_CALCULATION_EXCEL_DOCUMENT
    apiProps.params = params
    console.log(apiProps.url)
    return dispatch(fetchDispatch(apiProps))
  }
}

export default { generateComplaintDocument, generateResapealDocument, generateExcelDocument }
