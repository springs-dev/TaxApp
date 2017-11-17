import React from 'react'
import ImportData from '../../components/ImportData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { tableActions as actions } from '../../actions'

const ImportDataPage = (props) => {
  return (
    <div>
      <ImportData {...props} />
    </div>
  )
}

const mapStateToProps = ({csvTable}) => csvTable
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ImportDataPage)
