import React from 'react'
import { Form, Radio } from 'semantic-ui-react'
import SeniorExemption from './SeniorExemption'
import SeniorExemption2 from './SeniorExemption2'
import PropTypes from 'prop-types'

export default class HomeownerExemption2 extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = (e, data) => {
    this.setState({ value: data.value })
    this.props.setQuestionSecondLevel(data.name, data.value)
  }

  render () {
    let Greeting = React.createClass({
      render: function () {
        let partial
        if (this.props.something === 'incorrect') {
          partial = (
            <div>
              <br />
              <SeniorExemption
                setQuestionSecondLevel={this.props.setQuestionSecondLevel}
              />
            </div>
          )
        } else if (this.props.something === 'correct') {
          partial = (
            <div>
              <SeniorExemption2
                setQuestionSecondLevel={this.props.setQuestionSecondLevel}
              />
            </div>
          )
        }
        return <div>{partial}</div>
      }
    })
    return (
      <Form>
        <Form.Group inline>
          <label>
            Do you claim an exemption on another property in any other state?
          </label>
        </Form.Group>

        <br />
        <Form.Group inline>
          <Form.Field>
            <Radio
              label='Yes'
              name='Do you claim an exemption on another property in any other state?'
              value='correct'
              checked={this.state.value === 'correct'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='No '
              name='Do you claim an exemption on another property in any other state?'
              value='incorrect'
              checked={this.state.value === 'incorrect'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Greeting
            something={this.state.value}
            setQuestionSecondLevel={this.props.setQuestionSecondLevel}
          />
        </Form.Field>
      </Form>
    )
  }
}

HomeownerExemption2.propTypes = {
  something: PropTypes.string,
  setQuestionSecondLevel: PropTypes.func
}
