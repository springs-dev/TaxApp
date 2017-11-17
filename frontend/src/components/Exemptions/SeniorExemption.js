import React from 'react'
import {Form, Radio, Message} from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class SeniorExemption extends React.Component {
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
          partial = <div><br /><Message color='green'>You qualify for Homeowner Exemption</Message></div>
        } else if (this.props.something === 'correct') {
          partial = <div><br /><Message color='green'>You qualify for Senior Exemption and Homeowner exemptionn</Message></div>
        }
        return (
          <div>

            {partial}
          </div>
        )
      }
    })
    return (
      <Form>
        <Form.Group inline>
          <label>Are you, your spouse, or other effective owner who resides in the home as their primary residence over 65?</label>
        </Form.Group >

        <br />
        <Form.Group inline>

          <Form.Field>
            <Radio
              label='Yes'
              name='Are you, your spouse, or other effective owner who resides in the home as their primary residence over 65?'
              value='correct'
              checked={this.state.value === 'correct'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='No '
              name='Are you, your spouse, or other effective owner who resides in the home as their primary residence over 65?'
              value='incorrect'
              checked={this.state.value === 'incorrect'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Greeting something={this.state.value} />

        </Form.Field>

      </Form>
    )
  }
}

SeniorExemption.propTypes = {
  something: PropTypes.string,
  setQuestionSecondLevel: PropTypes.func
}
