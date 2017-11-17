import React, { Component } from 'react'
import { Form, Radio, Label } from 'semantic-ui-react'
import NewInput from './NewInput'
import PropTypes from 'prop-types'
import { questionarrieActions } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash'

class RadioProperty extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      value: ''
    }
  }

  handleChange = (e, { name, value }) => {
    this.setState({ value })
    if (value === 'correct') {
      console.log('Klikno na correct')
      this.props.actions.setQuestionSecondLevel(name, this.props.correctValue)
    }
  }

  checkIfEmpty = name => {
    const data = this.props.secondStepData
    let target = _.filter(
      data,
      obj => Object.values(obj)[0] !== '' && Object.keys(obj)[0] === name
    )
    return target.length > 0
  }

  getCurrentValue = fieldKey => {
    const currentField = this.props.secondStepData.filter(function (obj) {
      return Object.keys(obj)[0] === fieldKey
    })
    return Object.values(currentField[0])[0]
  }

  render () {
    let Greeting = React.createClass({
      render: function () {
        const partial =
          this.props.something === 'incorrect' ? (
            <div>
              <NewInput incorrectName={this.props.name} />
            </div>
          ) : (
            <div />
          )
        return <div>{partial}</div>
      }
    })
    const showError = !this.checkIfEmpty(this.props.name)
    console.log(
      'Za incorrect: ',
      this.props.correctValue !== this.getCurrentValue(this.props.name) &&
        this.getCurrentValue(this.props.name) !== ''
    )
    return (
      <Form>
        <Form.Group inline>
          <Form.Field>
            <Radio
              label='Correct'
              name={this.props.name}
              value='correct'
              checked={
                this.props.correctValue ===
                  this.getCurrentValue(this.props.name) ||
                this.state.value === 'correct'
              }
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='Incorrect - Update'
              name={this.props.name}
              value='incorrect'
              checked={this.state.value === 'incorrect'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Greeting something={this.state.value} name={this.props.name} />
          </Form.Field>

          {showError &&
            this.props.pageSubmitted === 2 && (
              <Label basic color='red' pointing='left'>
                Please check this field!
              </Label>
            )}
        </Form.Group>
      </Form>
    )
  }
}

function mapStateToProps (state) {
  return {
    secondStepData: state.questionnaireSecondStep.data,
    pageSubmitted: state.questionnaireSecondStep.pageSubmitted
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

RadioProperty.propTypes = {
  something: PropTypes.any,
  name: PropTypes.string,
  correctValue: PropTypes.string,
  actions: PropTypes.any,
  secondStepData: PropTypes.array,
  pageSubmitted: PropTypes.any
}

export default connect(mapStateToProps, mapDispatchToProps)(RadioProperty)
