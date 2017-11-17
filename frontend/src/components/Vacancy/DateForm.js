import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import PropTypes from 'prop-types'

import 'react-datepicker/dist/react-datepicker.css'

export class DateForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: moment()
    }
  }

  handleChange = date => {
    this.setState({
      startDate: date
    })
    this.props.setQuestionFourthLevel(this.props.name, JSON.stringify(date._d))
  }

  render () {
    return (
      <DatePicker
        selected={this.state.startDate}
        onChange={this.handleChange}
      />
    )
  }
}

DateForm.propTypes = {
  name: PropTypes.string,
  setQuestionFourthLevel: PropTypes.func
}
