import React from 'react'
import SelectedProperty from '../../components/SelectedProperty'
import SelectedPropertyInCase from '../../components/SelectedPropertyInCase'
import AssesstmentComparablesCalc from '../../components/AssesstmentComparablesCalc'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  propertyActions,
  pinActions,
  caseActions,
  selectedPropertyActions,
  rangeActions,
  filterActions,
  assesstmentComparablesActions,
  documentActions
} from '../../actions'
import PropTypes from 'prop-types'
import { Table, Segment } from 'semantic-ui-react'

const AssessmentComparablesPage = props => {
  return (
    <Segment>
      <AssesstmentComparablesCalc {...props} />
      <Table basic='very' definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell style={{fontWeight: '700', color: 'rgba(0,0,0,.87)'}}>PIN</Table.HeaderCell>
            <Table.HeaderCell>Township</Table.HeaderCell>
            <Table.HeaderCell>Neighborhood</Table.HeaderCell>
            <Table.HeaderCell>Class Code</Table.HeaderCell>
            <Table.HeaderCell>Class Description</Table.HeaderCell>
            <Table.HeaderCell>S/F</Table.HeaderCell>
            <Table.HeaderCell>Age</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>LAV</Table.HeaderCell>
            <Table.HeaderCell>BAV</Table.HeaderCell>
            <Table.HeaderCell>TAV</Table.HeaderCell>
            <Table.HeaderCell>BSF</Table.HeaderCell>
            <Table.HeaderCell>LSF</Table.HeaderCell>
            <Table.HeaderCell>Bld PSFV</Table.HeaderCell>
            <Table.HeaderCell>Land PSV</Table.HeaderCell>
            <Table.HeaderCell style={{display: 'none'}} />
          </Table.Row>
        </Table.Header>
        <SelectedProperty {...props} />
        <SelectedPropertyInCase {...props} />
        <Table.Footer>
          <Table.Row>
            {/* <Table.HeaderCell colSpan='16'>
              <Menu floated='right' pagination>
                <Menu.Item as='a' icon>
                  <Icon name='left chevron' />
                </Menu.Item>
                <Menu.Item as='a'>1</Menu.Item>
                <Menu.Item as='a'>2</Menu.Item>
                <Menu.Item as='a'>3</Menu.Item>
                <Menu.Item as='a'>4</Menu.Item>
                <Menu.Item as='a' icon>
                  <Icon name='right chevron' />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell> */}
          </Table.Row>
        </Table.Footer>
      </Table>
    </Segment>
  )
}

AssessmentComparablesPage.propTypes = {
  pin: PropTypes.any,
  property: PropTypes.any
}

function mapStateToProps (state) {
  return {
    pin: state.pin,
    property: state.property,
    cases: state.cases,
    selectedProperties: state.selectedProperties,
    propertySelected: state.propertySelected,
    loginProps: state.loginProps,
    ranges: state.ranges,
    filtering: state.filtering,
    assesstmentComparables: state.assesstmentComparables,
    document: state.document
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        pinActions,
        propertyActions,
        caseActions,
        selectedPropertyActions,
        rangeActions,
        filterActions,
        assesstmentComparablesActions,
        documentActions
      ),
      dispatch
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(
  AssessmentComparablesPage
)
