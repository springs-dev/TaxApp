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
    case ACTIONS.SET_THIRD_LEVEL_QUESTION_DATA: {
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
    case '@@redux-form/CHANGE': {
      const info = {
        name: action.meta.field,
        value: action.payload
      }
      let currentData = handleAddingData(info, state)
      return {
        data: currentData
      }
    }
    default:
      return state
  }
}

function questionnaireThirdReducer (state = {}, action) {
  return Object.assign({}, state, handleQuestionnaireActions(state, action))
}

export default questionnaireThirdReducer
