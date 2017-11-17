import CONSTS from '../constants'

function setNextPage (pageNumber) {
  return {
    type: CONSTS.ACTIONS.SET_NEXT_STEP_PAGE,
    pageNumber
  }
}

export default { setNextPage }
