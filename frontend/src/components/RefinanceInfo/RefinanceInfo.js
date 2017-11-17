import React, { Component } from 'react'
import { Segment, Form } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { questionarrieActions } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class RefinanceInfo extends Component {
  handleChange = (e, data) => {
    console.log(data)
    this.props.actions.setQuestionFourthLevel(data.name, data.value)
  }
  render () {
    return (
      <Form>
        <h3 style={{ color: '#60c9c6' }}>Refinance Information</h3>
        <Segment>
          <Form.Input
            id='form-input-control-first-exp'
            name='When was the most recent refinance? (Month/Year)'
            label='When was the most recent refinance? (Month/Year)'
            placeholder='MM/YYYY'
            onChange={this.handleChange}
          />
          <Form.Input
            id='form-input-control-first-exp'
            name='What was the appraised value at the time of refinance?'
            label='What was the appraised value at the time of refinance? *'
            placeholder='$'
            onChange={this.handleChange}
          />
          <Form.Input
            id='form-input-control-first-exp'
            name='What was the interest rate term(rate/term).'
            label='What was the interest rate term(rate/term).'
            placeholder='rate/term'
            onChange={this.handleChange}
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

RefinanceInfo.propTypes = {
  actions: PropTypes.any
}

export default connect(null, mapDispatchToProps)(RefinanceInfo)
