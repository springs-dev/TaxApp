import React from 'react'
import { Form, Radio } from 'semantic-ui-react'
import { DateForm } from './DateForm'
import PropTypes from 'prop-types'

export class Rebuilt extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      name: ''
    }
  }

  handleChange = (e, data) => {
    this.setState({ value: data.value, name: data.name })
    this.props.setQuestionFourthLevel(data.name, data.value)
  }

  render () {
    let Greeting = React.createClass({
      render: function () {
        let partial
        if (this.props.something === 'correct') {
          partial = (
            <div>
              <label>When?</label>
              <DateForm
                name={this.props.name}
                setQuestionFourthLevel={this.props.setQuestionFourthLevel}
              />
            </div>
          )
        } else {
          partial = <div />
        }
        return <div>{partial}</div>
      }
    })
    return (
      <Form>
        <label>Was the property rebuilt?</label>
        <Form.Group inline>
          <Form.Field>
            <Radio
              label='Yes'
              name='Was the property rebuilt?'
              value='correct'
              checked={this.state.value === 'correct'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='No '
              name='Was the property rebuilt?'
              value='incorrect'
              checked={this.state.value === 'incorrect'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Greeting
          something={this.state.value}
          name={this.state.name}
          setQuestionFourthLevel={this.props.setQuestionFourthLevel}
        />
      </Form>
    )
  }
}

Rebuilt.propTypes = {
  something: PropTypes.string,
  setQuestionFourthLevel: PropTypes.func,
  name: PropTypes.string
}
