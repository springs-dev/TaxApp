import { ACTIONS } from '../constants'
import tableActions from './tableActions'
import propertyActions from './propertyActions'
import pinActions from './pinActions'
import caseActions from './caseActions'
import selectedPropertyActions from './selectedPropertyActions'
import rangeActions from './rangeActions'
import filterActions from './filterActions'
import assesstmentComparablesActions from './assesstmentComparablesActions'
import documentActions from './documentActions'
import loginActions from './loginActions'
import questionarrieActions from './questionnaireActions'
import registerUserActions from './registerUserActions'
import stepActions from './stepActions'

function resetErrorMessage () {
  return { type: ACTIONS.RESET_ERROR_MESSAGE }
}

function getUserAuth () {
  return { type: ACTIONS.GET_USER_AUTH }
}
export {
  tableActions,
  propertyActions,
  pinActions,
  caseActions,
  selectedPropertyActions,
  rangeActions,
  filterActions,
  assesstmentComparablesActions,
  documentActions,
  resetErrorMessage,
  getUserAuth,
  loginActions,
  questionarrieActions,
  registerUserActions,
  stepActions
}
