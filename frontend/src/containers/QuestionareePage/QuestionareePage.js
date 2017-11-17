import React from 'react'
import WizardForm from '../../components/Questionaree/Questionaree'
// import PropertyFilteringData from '../../components/PropertyFilteringData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { propertyActions, pinActions } from '../../actions'
import { Grid, Segment } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const QuestionnaireWizardPage = props => {
  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <WizardForm {...props} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}

const mapStateToProps = ({ property }) => property

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({}, pinActions, propertyActions), dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  QuestionnaireWizardPage
))
