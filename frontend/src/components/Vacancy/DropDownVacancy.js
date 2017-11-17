import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const stateOptions = [
  { key: '0', value: '0', text: 'Gut Rehab' },
  { key: '1', value: '1', text: 'Decrepit/uninhabitable' },
  { key: '2', value: '2', text: 'fire/flood' }
]

const DropdownVacancy = props => (
  <Dropdown
    placeholder='Vacancies'
    search
    selection
    options={stateOptions}
    onChange={(e, data) => {
      props.setQuestionFourthLevel(props.name, stateOptions[data.value].text)
    }}
  />
)

DropdownVacancy.propTypes = {
  setQuestionFourthLevel: PropTypes.func,
  name: PropTypes.string
}

export default DropdownVacancy
