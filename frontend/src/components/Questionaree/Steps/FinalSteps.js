import React from 'react'
import { reduxForm } from 'redux-form'
import validate from '../validate'
import Steps from 'react-steps'
import { Container, Progress } from 'semantic-ui-react'
import LoginPage from '../../Login/LoginPage'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class FinalSteps extends React.Component {
  state = {
    haveAccount: true
  }
  componentWillMount () {
    if (this.props.isUserLogged) {
      this.props.history.push('/home')
    }
  }
  render () {
    const { handleSubmit } = this.props
    const { data } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <Container>
            <Steps items={data} type={'circle'} flat />
            <Progress percent={80} color='orange' />
            <h2>Submit information </h2>
            {!this.props.isUserLogged && <LoginPage />}
          </Container>
        </div>
      </form>
    )
  }
}

FinalSteps.propTypes = {
  handleSubmit: PropTypes.func,
  data: PropTypes.any,
  isUserLogged: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}
FinalSteps = reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FinalSteps)

export default withRouter(FinalSteps)
