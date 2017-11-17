import React from 'react'
import PropertyDetail from '../../components/PropertyDetail'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pinActions as actions } from '../../actions'

const PropertyDetailPage = (props) => {
  return (
    <div>
      <PropertyDetail {...props} />
    </div>
  )
}
const mapStateToProps = ({pin}) => pin
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PropertyDetailPage)
