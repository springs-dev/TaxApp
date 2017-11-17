import React from 'react'
import DatePicker from 'react-dropdowns-datepicker'
import PropTypes from 'prop-types'
require('./DropdownDP.styl')

export default class DropDownDP extends React.Component {
  dateChange = date => {
    if (date) {
      this.props.setQuestionFourthLevel('Purchase date', date)
    }
  }

  render () {
    return <DatePicker className='select-size' dateChange={this.dateChange} />
  }
}

DropDownDP.propTypes = {
  setQuestionFourthLevel: PropTypes.func
}
