import React from 'react'
import ArgumentReview from '../../components/ArgumentReview'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { caseActions } from '../../actions'
import PropTypes from 'prop-types'

const AdminPage = (props) => {
  return (
    <div>
      <ArgumentReview {...props} />
    </div>
  )
}

AdminPage.propTypes = {
  // actions
  case: PropTypes.any
}
function mapStateToProps (state) {
  return { cases: state.cases, activeCase: state.activeCase }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(Object.assign({}, caseActions), dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
