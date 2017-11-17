import React from 'react'
import MyProperties from '../../components/MyProperties'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pinActions, caseActions } from '../../actions'
import PropTypes from 'prop-types'

const MyPropertiesPage = (props) => {
  return (
    <div>
      <MyProperties {...props} />
    </div>
  )
}

MyPropertiesPage.propTypes = {
  // actions
  pin: PropTypes.any
}
function mapStateToProps (state) {
  return { pin: state.pin, cases: state.cases }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({}, pinActions, caseActions), dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyPropertiesPage)
