import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import validate from '../validate'
import Steps from 'react-steps'
import { Container, Progress, Grid, Button, Form } from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import PropertySelection from '../../PropertySelection/PropertySelection'
import {
  pinActions,
  propertyActions,
  caseActions,
  stepActions
} from '../../../actions'

const FirstStep = props => {
  const { handleSubmit, nextPage } = props
  const { data } = props
  PropertySelection.propTypes = {
    // actions
    fetchData: PropTypes.func,
    // state data
    pin: PropTypes.any,
    actions: PropTypes.any,
    data: PropTypes.array
  }

  return (
    <div>
      <Form onSubmit={nextPage}>
        <div>
          <Container>
            <Steps items={data} type={'circle'} flat />
            <Progress percent={5} color='orange' />
            <PropertySelection
              actions={props.actions}
              property={props.property}
              case={props.case}
              showNextButton={false}
            />
            <br />
            <Grid columns={3}>
              <Grid.Row centered columns={3}>
                <Grid.Column width={5} />
                <Grid.Column textAlign='center' width={6}>
                  <Button
                    basic
                    color='orange'
                    labelPosition='right'
                    icon='right chevron'
                    content='Forward'
                  />
                </Grid.Column>
                <Grid.Column width={5} />
              </Grid.Row>
            </Grid>
          </Container>
        </div>
      </Form>
    </div>
  )
}

FirstStep.propTypes = {
  handleSubmit: PropTypes.func,
  nextPage: PropTypes.func,
  data: PropTypes.any,
  actions: PropTypes.any,
  property: PropTypes.any,
  case: PropTypes.any
}

function mapStateToProps (state) {
  return {
    property: state.property,
    case: state.case
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign({}, pinActions, propertyActions, caseActions, stepActions),
      dispatch
    )
  }
}

const ConnectedFirstStep = connect(mapStateToProps, mapDispatchToProps)(
  FirstStep
)

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(ConnectedFirstStep)
