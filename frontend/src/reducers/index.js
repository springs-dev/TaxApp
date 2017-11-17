import CONSTS from '../constants'
import { combineReducers } from 'redux'
import table from './tableReducer'
import property from './propertyReducer'
import cases from './caseReducer'
import pin from './pinReducer'
import ranges from './rangeReducer'
import selectedProperties from './selectedPropertyReducer'
import filtering from './filterReducer'
import assesstmentComparables from './assesstmentComparablesReducer'
import document from './documentReducer'
import loginProps from './loginReducer'
import questionnaireSecondStep from './questionnaireReducers'
import registerUserProps from './registerReducer'
import activeCase from './activeCaseReducer'
import stepData from './stepReducer'
import questionnaireThirdStep from './questionnaireThirdReducer'
import { reducer as reduxFormReducer } from 'redux-form'
import propertySelected from './propertySelectedReducer'

// Updates error message to notify about the failed fetches.
function errorMessage (state = {}, action) {
  const { type, error } = action

  if (type === CONSTS.ACTIONS.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.errorMessage
  }

  return state
}

const rootReducer = combineReducers({
  table,
  property,
  pin,
  cases,
  ranges,
  selectedProperties,
  filtering,
  document,
  assesstmentComparables,
  errorMessage,
  loginProps,
  questionnaireSecondStep,
  questionnaireThirdStep,
  registerUserProps,
  activeCase,
  form: reduxFormReducer,
  propertySelected,
  stepData
})

export default rootReducer
