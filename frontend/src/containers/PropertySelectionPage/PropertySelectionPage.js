import React from 'react'
import PropertySelection from '../../components/PropertySelection'
import { connect } from 'react-redux'
import {Container, Button, Grid} from 'semantic-ui-react'
import { bindActionCreators } from 'redux'
import { pinActions, propertyActions, caseActions } from '../../actions'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

const PropertySelectionPage = (props) => {
  return (
    <div>
      <Container>
        <br />
        <PropertySelection {...props} />
        <Grid>
          <Grid.Row centered>
          </Grid.Row>

        </Grid>
      </Container>
    </div>
  )
}

PropertySelectionPage.propTypes = {
  // actions
  pin: PropTypes.any
}

function mapStateToProps (state) {
  return { pin: state.pin, property: state.property, case: state.case }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({}, pinActions, propertyActions, caseActions), dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PropertySelectionPage))
