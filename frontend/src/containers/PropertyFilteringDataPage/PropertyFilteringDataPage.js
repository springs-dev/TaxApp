import React from 'react'
import PropertyFilteringData from '../../components/PropertyFilteringData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { tableActions as actions } from '../../actions'
import { Segment } from 'semantic-ui-react'

const PropertyFilteringDataPage = (props) => {
  return (
    <div>
      <br />
      <Segment>
        <PropertyFilteringData {...props} />
      </Segment>
    </div>
  )
}

const mapStateToProps = ({table}) => table
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PropertyFilteringDataPage)
