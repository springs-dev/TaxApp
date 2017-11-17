import React from 'react'
import { reduxForm } from 'redux-form'
import validate from '../validate'
import Steps from 'react-steps'
import { Container, Progress, Grid, Button } from 'semantic-ui-react'
import ContactInfo from '../../ContactInfo/ContactInfo'
import ContactInfoReduxForm from '../../ContactInfo/ContactInfoReduxForm'
import PropTypes from 'prop-types'

const handleReduxFormSubmit = values => {
  console.log('Submited redux form values: ', values)
}

const ThirdStep = props => {
  const { handleSubmit, previousPage } = props
  const { data } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Container>
          <Steps items={data} type={'circle'} flat />
          <Progress percent={36} color='orange' />
          <h2>Provide your contact and credit card details</h2>
          <h4 style={{ color: '#60c9c6' }}>
            Your credit card won’t be charged yet. Proceed with the process to
            see the total price, including additional fees and any taxes
          </h4>
          <ContactInfoReduxForm onSubmit={handleReduxFormSubmit} />
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column width={5} />
              <Grid.Column textAlign='center' width={6}>
                <Button.Group>
                  <Button
                    basic
                    color='orange'
                    onClick={previousPage}
                    labelPosition='left'
                    icon='left chevron'
                    content='Back'
                  />
                  <Button
                    basic
                    color='orange'
                    onClick={props.onSubmit}
                    labelPosition='right'
                    icon='right chevron'
                    content='Forward'
                  />
                </Button.Group>
              </Grid.Column>
              <Grid.Column width={5} />
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </form>
  )
}

ThirdStep.propTypes = {
  data: PropTypes.any,
  previousPage: PropTypes.func,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func
}

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ThirdStep)
