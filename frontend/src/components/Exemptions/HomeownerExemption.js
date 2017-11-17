import React from 'react'
import { Form, Radio } from 'semantic-ui-react'
import HomeownerExemption2 from './HomeownerExemption2'
import SeniorExemption2 from './SeniorExemption2'
import PropTypes from 'prop-types'

export default class HomeownerExemption extends React.Component {
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
              <SeniorExemption2
                setQuestionSecondLevel={this.props.setQuestionSecondLevel} />
              <br />
            </div>
          )
        } else if (this.props.something === 'correct') {
          partial = (
            <div>
              <HomeownerExemption2
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
          <label>Is this your primary residence?</label>
        </Form.Group>

        <br />
        <Form.Group inline>
          <Form.Field>
            <Radio
              label='Yes'
              name='Is this your primary residence?'
              value='correct'
              checked={this.state.value === 'correct'}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Radio
              label='No '
              name='Is this your primary residence?'
              value='incorrect'
              checked={this.state.value === 'incorrect'}
              onChange={this.handleChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <Greeting something={this.state.value} setQuestionSecondLevel={this.props.setQuestionSecondLevel} />
        </Form.Field>
      </Form>
    )
  }
}

HomeownerExemption.propTypes = {
  setQuestionSecondLevel: PropTypes.func,
  // name: PropTypes.string,
  something: PropTypes.string
}
