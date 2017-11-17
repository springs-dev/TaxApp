import { ACTIONS } from '../constants'

function handleAddingData (info, state) {
  let newObj = {}
  newObj[info.name] = info.value
  let currentData = [...state.data]
  let currentLength = currentData.length
  let existsAlready = false

  if (currentLength > 0) {
    for (let i = 0; i < currentData.length; i++) {
      if (Object.keys(currentData[i])[0] === info.name) {
        currentData[i][info.name] = info.value
        existsAlready = true
        return currentData
      }
    }
    if (!existsAlready) {
      currentData.push(newObj)
    }
  } else {
    currentData.push(newObj)
  }
  return currentData
}

function handleQuestionnaireActions (state, action) {
  switch (action.type) {
    case ACTIONS.SET_SECOND_LEVEL_QUESTION_DATA: {
      let currentData = handleAddingData(action.info, state)
      return {
        data: currentData
      }
    }
    case ACTIONS.SET_THIRD_LEVEL_QUESTION_DATA: {
      let currentData = handleAddingData(action.info, state)
      return {
        data: currentData
      }
    }
    case ACTIONS.SET_FOURTH_LEVEL_QUESTION_DATA: {
      let currentData = handleAddingData(action.info, state)
      return {
        data: currentData
      }
    }
    case ACTIONS.QUEST_PAGE_SUBMITTED: {
      return {
        pageSubmitted: action.pageNumber
      }
    }
    default:
      return state
  }
}

function questionnaireReducer (state = {}, action) {
  return Object.assign({}, state, handleQuestionnaireActions(state, action))
}

export default questionnaireReducer
