import React from 'react'
import PropertyFiltering from '../../components/PropertyFiltering'
import SelectedProperty from '../../components/SelectedProperty'
import SelectedPropertyInCase from '../../components/SelectedPropertyInCase'
import PropertyFilteringData from '../../components/PropertyFilteringData'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  propertyActions,
  pinActions,
  caseActions,
  selectedPropertyActions,
  rangeActions,
  filterActions
} from '../../actions'
import PropTypes from 'prop-types'
import { Grid, Segment, Table, Button } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'
import _ from 'lodash'

class PropertyFilteringPage extends React.Component {
  constructor (props) {
    super()
    this.state = {
      column: null,
      direction: null
    }
  }

  componentDidMount () {
    this.props.actions.fetchDataById(this.props.match.params.property_id)
  }

  handleSort = clickedColumn => () => {
    const { direction } = this.state
    this.setState({
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    })
    this.props.actions.sortBy(clickedColumn, direction)
    // ovdje samo opaliti akciju da se trazi sort po necemu
    /*
    const { tableData, direction } = this.state

    this.setState({
      column: clickedColumn,
      tableData: _.sortBy(tableData, o => o.pin),
      direction: 'ascending'
    })

    this.setState({
      tableData: tableData.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending'
    })
    */
  }
  render () {
    const { direction } = this.state
    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <PropertyFiltering {...this.props} />
            </Grid.Column>
          </Grid.Row>
          <Table sortable celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'pin' && direction}
                  onClick={this.handleSort('pin')}
                  style={{fontWeight: '700', color: 'rgba(0,0,0,.87)'}}
                >
                  PIN
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'township' && direction}
                  onClick={this.handleSort('township')}
                >
                  Township
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'neighborhood' && direction}
                  onClick={this.handleSort('neighborhood')}
                >
                  Neighborhood
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'ovacls' && direction}
                  onClick={this.handleSort('ovacls')}
                >
                  Class Code
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'class_description' && direction}
                  onClick={this.handleSort('class_description')}
                >
                  Class Description
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'building_sq_ft' && direction}
                  onClick={this.handleSort('building_sq_ft')}
                >
                  S/F
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'age' && direction}
                  onClick={this.handleSort('age')}
                >
                  Age
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'address' && direction}
                  onClick={this.handleSort('address')}
                >
                  Address
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'current_land' && direction}
                  onClick={this.handleSort('current_land')}
                >
                  LAV
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'current_building' && direction}
                  onClick={this.handleSort('current_building')}
                >
                  BAV
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'current_total' && direction}
                  onClick={this.handleSort('current_total')}
                >
                  TAV
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'building_sq_ft' && direction}
                  onClick={this.handleSort('building_sq_ft')}
                >
                  BSF
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'land_sq_ft' && direction}
                  onClick={this.handleSort('land_sq_ft')}
                >
                  LSF
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'bldpsfv' && direction}
                  onClick={this.handleSort('bldpsfv')}
                >
                  Bld PSFV
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={this.props.sortParameter === 'landpsv' && direction}
                  onClick={this.handleSort('landpsv')}
                >
                  Land PSV
                </Table.HeaderCell>
                <Table.HeaderCell style={{ display: 'none' }} />
              </Table.Row>
            </Table.Header>
            <SelectedProperty {...this.props} />
            <SelectedPropertyInCase {...this.props} />
            <PropertyFilteringData
              actions={this.props.actions}
              property={this.props.property}
              pin={this.props.pin}
              cases={this.props.cases}
              selectedProperties={this.props.selectedProperties}
              propertySelected={this.props.propertySelected}
              ranges={this.props.ranges}
              filtering={this.props.filtering}
              activeCase={this.props.activeCase}
            />
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
          {/* <Button waves='green' node='a' className='col s8' large href='assessment' >Assesstment Comparables</Button> */}
        </Grid>
        <Grid>
          <Grid.Row centered>
            <Button
              basic
              color='orange'
              labelPosition='left'
              icon='left chevron'
              content='Back'
              as={Link}
              to='/taxappeal/property/filter'
            />
            <Button
              basic
              color='orange'
              labelPosition='right'
              icon='right chevron'
              content='Next'
              as={Link}
              to='/taxappeal/assessment'
            />
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

PropertyFilteringPage.propTypes = {
  pin: PropTypes.any,
  property: PropTypes.any,
  activeCase: PropTypes.any,
  filtering: PropTypes.any,
  ranges: PropTypes.any,
  propertySelected: PropTypes.any,
  selectedProperties: PropTypes.any,
  cases: PropTypes.any,
  handleSort: PropTypes.func,
  actions: PropTypes.any,
  match: PropTypes.any,
  sortParameter: PropTypes.string
}

function mapStateToProps (state) {
  const sortParameter = state.property.sortKey
  let allProperties = state.property
  let sortBy = state.property.direction === 'ascending' ? 'asc' : 'desc'

  if (sortParameter === 'address') {
    allProperties.data = _.orderBy(state.property.data, ['street'], [sortBy])
  } else {
    allProperties.data = _.orderBy(
      state.property.data,
      [sortParameter],
      [sortBy]
    )
  }

  return {
    pin: state.pin,
    property: allProperties,
    cases: state.cases,
    selectedProperties: state.selectedProperties,
    ranges: state.ranges,
    filtering: state.filtering,
    activeCase: state.activeCase,
    propertySelected: state.propertySelected,
    sortParameter,
    properties: state.property
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
        filterActions
      ),
      dispatch
    )
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
  PropertyFilteringPage
))
