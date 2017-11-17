import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { questionarrieActions } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class NewInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      incorrectInputValue: ''
    }
  }

  getCurrentValue = fieldKey => {
    const currentField = this.props.secondStepData.filter(function (obj) {
      return Object.keys(obj)[0] === fieldKey
    })
    this.setState({
      incorrectInputValue: Object.values(currentField[0])[0]
    })
  }

  render () {
    return (
      <Form>
        <Form.Field>
          <input
            placeholder='New Value'
            onChange={newValue =>
              this.setState({ incorrectInputValue: newValue.target.value })}
            onBlur={() => {
              this.props.actions.setQuestionSecondLevel(
                this.props.incorrectName,
                this.state.incorrectInputValue
              )
            }}
          />
        </Form.Field>
      </Form>
    )
  }
}

NewInput.propTypes = {
  incorrectName: PropTypes.string,
  actions: PropTypes.any,
  secondStepData: PropTypes.array
}

function mapStateToProps (state) {
  return {
    secondStepData: state.questionnaireSecondStep.data
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

export default connect(mapStateToProps, mapDispatchToProps)(NewInput)
