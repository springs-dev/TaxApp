import React from 'react'
import { reduxForm } from 'redux-form'
import validate from '../validate'
import Steps from 'react-steps'
import PropTypes from 'prop-types'
import { Container, Progress, Grid, Button } from 'semantic-ui-react'
import PurchaseInformation from '../../Purchase/PurchaseInformation'
import RefinanceInfo from '../../RefinanceInfo/RefinanceInfo'
import VacancyInfo from '../../Vacancy/VacancyInfo'

const FourthStep = props => {
  const { handleSubmit, previousPage } = props
  const { data } = props

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Container>
          <Steps items={data} type={'circle'} flat />
          <Progress percent={54} color='orange' />
          <h2>Sales information </h2>
          <PurchaseInformation />
          <br />
          <RefinanceInfo />
          <br />
          <VacancyInfo />
          <Grid columns={3}>
            <Grid.Row>
              <Grid.Column width={5} />
              <Grid.Column textAlign='center' width={6}>
                <br />
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
                    labelPosition='right'
                    icon='right chevron'
                    content='Forward'
                    onClick={props.onSubmit}
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

FourthStep.propTypes = {
  onSubmit: PropTypes.func,
  handleSubmit: PropTypes.func,
  previousPage: PropTypes.func,
  data: PropTypes.any
}

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(FourthStep)
