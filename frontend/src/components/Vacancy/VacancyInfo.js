import React, { Component } from 'react'
import { Form, Segment } from 'semantic-ui-react'
import RadioDropdown from './RadioDropdown'
import { TornDown } from './TornDown'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { questionarrieActions } from '../../actions'

class VacancyInfo extends Component {
  render () {
    return (
      <Form>
        <h3 style={{ color: '#60c9c6' }}>Vacancy Information</h3>
        <Segment>
          <RadioDropdown
            setQuestionFourthLevel={this.props.actions.setQuestionFourthLevel}
          />
          <TornDown
            setQuestionFourthLevel={this.props.actions.setQuestionFourthLevel}
          />
        </Segment>
      </Form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign({}, questionarrieActions),
      dispatch
    )
  }
}

VacancyInfo.propTypes = {
  actions: PropTypes.any
}

export default connect(null, mapDispatchToProps)(VacancyInfo)
