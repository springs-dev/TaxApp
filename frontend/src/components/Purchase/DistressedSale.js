import React from 'react'
import { Form, Radio } from 'semantic-ui-react'
import PropTypes from 'prop-types'

export default class DistressedSale extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = (e, data) => {
    this.setState({ value: data.value })
    this.props.setQuestionFourthLevel('Distressed sale', data.value)
  }

  render () {
    return (
      <Form>
        <Form.Group inline>
          <label>Was it a distressed sale? *</label>
          <Form.Field>
            <Radio
              label='Yes'
              name='radioGroup'
              value='correct'
              checked={this.state.value === 'correct'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='No'
              name='radioGroup'
              value='incorrect'
              checked={this.state.value === 'incorrect'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='I do not know'
              name='radioGroup'
              value='I do not know'
              checked={this.state.value === 'I do not know'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}

DistressedSale.propTypes = {
  setQuestionFourthLevel: PropTypes.func
}
