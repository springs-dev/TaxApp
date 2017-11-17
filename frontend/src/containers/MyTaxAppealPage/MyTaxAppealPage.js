import React from 'react'
import HomeScreen from '../../components/HomeScreen'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { pinActions, propertyActions, caseActions } from '../../actions'
import PropTypes from 'prop-types'
import './style.styl'

const divStyle = {
  background: '#1b1c1d',
  height: '-webkit-fill-available'
}

const MyTaxAppealPage = (props) => {
  return (
    <div style={divStyle}>
      <HomeScreen {...props} />
    </div>
  )
}

MyTaxAppealPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MyTaxAppealPage)
