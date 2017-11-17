import React from 'react'
import { Form, Radio } from 'semantic-ui-react'
import DropdownVacancy from './DropDownVacancy'
import PropTypes from 'prop-types'

export default class RadioDropdown extends React.Component {
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
              <DropdownVacancy
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
        <Form.Group inline>
          <label>
            Was the property ever vacancy during your ownership for more than 3
            months?
          </label>
        </Form.Group>

        <Form.Group inline>
          <Form.Field>
            <Radio
              label='Yes'
              name='Vacancy property'
              value='correct'
              checked={this.state.value === 'correct'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='No '
              name='Vacancy property'
              value='incorrect'
              checked={this.state.value === 'incorrect'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Greeting
              setQuestionFourthLevel={this.props.setQuestionFourthLevel}
              something={this.state.value}
              name={this.state.name}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}

RadioDropdown.propTypes = {
  something: PropTypes.string,
  name: PropTypes.string,
  setQuestionFourthLevel: PropTypes.func
}
