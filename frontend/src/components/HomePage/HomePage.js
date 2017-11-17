import React from 'react'
import UserHome from './UserHome'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pinActions as actions } from '../../actions'

const HomePage = props => {
  return (
    <div>
      <UserHome />
    </div>
  )
}

function mapStateToProps (state) {
  return {
    documents: state.documents
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
