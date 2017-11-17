import CONSTS from '../constants'

function setQuestionSecondLevel (name, value) {
  return (dispatch, getState) => {
    return dispatch({
      type: CONSTS.ACTIONS.SET_SECOND_LEVEL_QUESTION_DATA,
      info: { name, value }
    })
  }
}

function setQuestionThirdLevel (name, value) {
  return (dispatch, getState) => {
    return dispatch({
      type: CONSTS.ACTIONS.SET_THIRD_LEVEL_QUESTION_DATA,
      info: { name, value }
    })
  }
}

function setQuestionFourthLevel (name, value) {
  return (dispatch, getState) => {
    return dispatch({
      type: CONSTS.ACTIONS.SET_FOURTH_LEVEL_QUESTION_DATA,
      info: { name, value }
    })
  }
}

function questPageSubmitted (pageNumber) {
  return (dispatch, getState) => {
    return dispatch({
      type: CONSTS.ACTIONS.QUEST_PAGE_SUBMITTED,
      pageNumber
    })
  }
}

export default {
  setQuestionSecondLevel,
  setQuestionThirdLevel,
  setQuestionFourthLevel,
  questPageSubmitted
}
