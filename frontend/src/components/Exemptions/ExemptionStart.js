import React from 'react'
import { Form, Radio, Message } from 'semantic-ui-react'
import ExemptionList from './ExemptionList'
import HomeownerExemption from './HomeownerExemption'
import { questionarrieActions } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

class ExemptionPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = (e, data) => {
    this.setState({ value: data.value })
    this.props.actions.setQuestionSecondLevel(data.name, data.value)
  }

  render () {
    let Greeting = React.createClass({
      render: function () {
        let partial
        if (this.props.something === 'incorrect') {
          partial = (
            <div>
              <HomeownerExemption
                name={'Is this your primary residence'}
                setQuestionSecondLevel={this.props.setQuestionSecondLevel}
              />
            </div>
          )
        } else if (this.props.something === 'correct') {
          partial = (
            <div>
              <Message color='red'>
                You do not qualify for any exemption
              </Message>
            </div>
          )
        }
        return <div>{partial}</div>
      }
    })
    return (
      <Form>
        <Form.Group inline>
          <label>Do you have any of the following exemptions?</label>
        </Form.Group>

        <ExemptionList />
        <br />
        <Form.Group inline>
          <Form.Field>
            <Radio
              label='Yes'
              name='Do you have any of the following exemptions?'
              value='correct'
              checked={this.state.value === 'correct'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='No '
              name='Do you have any of the following exemptions?<'
              value='incorrect'
              checked={this.state.value === 'incorrect'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <br />
          <Greeting
            something={this.state.value}
            setQuestionSecondLevel={this.props.actions.setQuestionSecondLevel}
          />
        </Form.Field>
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

ExemptionPage.propTypes = {
  actions: PropTypes.any,
  something: PropTypes.string,
  setQuestionSecondLevel: PropTypes.func
}

export default connect(null, mapDispatchToProps)(ExemptionPage)
