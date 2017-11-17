import React from 'react'
import { Form, Radio } from 'semantic-ui-react'
import { DateForm } from './DateForm'
import { Rebuilt } from './Rebuilt'
import PropTypes from 'prop-types'

export class TornDown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      name: ''
    }
  }

  handleChange = (e, data) => {
    this.setState({ value: data.value, name: data.name })
    if (data.value === 'incorrect') {
      this.props.setQuestionFourthLevel(data.name, data.value)
    }
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
              <br />
              <Rebuilt
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
        <Form.Group inline>
          <label>Was the property torn down?</label>
        </Form.Group>

        <Form.Group inline>
          <Form.Field>
            <Radio
              label='Yes'
              name='Property torn down'
              value='correct'
              checked={this.state.value === 'correct'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='No '
              name='Property torn down'
              value='incorrect'
              checked={this.state.value === 'incorrect'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field />
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

TornDown.propTypes = {
  setQuestionFourthLevel: PropTypes.func,
  something: PropTypes.string,
  name: PropTypes.string
}
