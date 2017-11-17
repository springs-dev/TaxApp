import { ACTIONS } from '../constants'

function handleDocumentActions (state, action) {
  switch (action.type) {
    case ACTIONS.REQUEST_DOCUMENT_GENERATE:
      return { isFetching: true }
    case ACTIONS.REQUEST_COMPLAINT_DOCUMENT_GENERATE:
      return {
        isFetchingComplaint: true
      }
    case ACTIONS.REQUEST_RESAPPEAL_DOCUMENT_GENERATE:
      return {
        isFetchingResappeal: true
      }
    case ACTIONS.REQUEST_CALCULATION_EXCEL_DOCUMENT:
      return {
        isFetchingExcel: true
      }
    case ACTIONS.RECEIVE_REREVIEW_DOCUMENT_GENERATE:
      const documentAll = action.response
      return {
        isFetching: false,
        rereview: documentAll.data
      }
    case ACTIONS.RECEIVE_COMPLAINT_DOCUMENT_GENERATE:
      const complaintData = action.response
      return {
        isFetchingComplaint: false,
        complaint: complaintData.data
      }
    case ACTIONS.RECEIVE_CALCULATION_EXCEL_DOCUMENT:
      const excelData = action.response
      return {
        isFetchingExcel: false,
        excelData: excelData.data
      }
    case ACTIONS.RECEIVE_RESAPPEAL_DOCUMENT_GENERATE:
      const resappealData = action.response
      return {
        isFetchingResappeal: false,
        resappeal: resappealData.data
      }
    case ACTIONS.RECEIVE_OWNERLESSEVERF_DOCUMENT_GENERATE:
      const ownerlesseverfData = action.response
      return {
        isFetching: false,
        ownerlesseverf: ownerlesseverfData.data
      }
    default:
      return state
  }
}

function documentReducer (state = {}, action) {
  return Object.assign({}, state, handleDocumentActions(state, action))
}

export default documentReducer
