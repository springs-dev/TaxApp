import React from 'react'
import PropTypes from 'prop-types'
// import { SortHeaderCell, DataCell } from './Cells'
// import ResponsiveTableWrapper from '../ResponsiveTableWrapper'
import { Table, Form, Input, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import './PropertyFilteringData.styl'

class PropertyFilteringData extends React.Component {
  constructor (props) {
    super()
    this.state = {
      selectedPin: ''
    }
  }
  handleSelectSubmit = e => {
    e.preventDefault()
    let index = e.target.keyIndex.value
    let propertyId = e.target.propertyId.value
    let propertyPin = e.target.propertyPin.value
    this.setState({ selectedPin: propertyPin })
    this.props.property.data.slice(0, index)
    this.props.actions.selectProperty(propertyId, this.props.cases.caseData.id)
  }
  render () {
    const { data } = this.props.property
    // const { isFetching, data, filterString, sortBy, sortKey, sortDesc } = this.props
    // const headerCellProps = { sortBy, sortKey, sortDesc }

    return (
      <Table.Body>
        { data.map((property, key) => {
          const total =
            parseFloat(property.land_sq_ft) +
            parseFloat(property.building_sq_ft)
          return (
            <Table.Row key={key}>
              {/* <Table.Cell>{property.pin.slice(0, 2) + '-' + property.pin.slice(2, 4) + '-' + property.pin.slice(4, 7) + '-' + property.pin.slice(7, 11) + '-' + property.pin.slice(11, 14)}</Table.Cell> */}
              <Table.Cell>{property.pin}</Table.Cell>
              <Table.Cell>{property.township}</Table.Cell>
              <Table.Cell>{property.neighborhood}</Table.Cell>
              <Table.Cell>{property.ovacls}</Table.Cell>
              <Table.Cell>{property.class_description}</Table.Cell>
              <Table.Cell>{parseFloat(total).toFixed()}</Table.Cell>
              <Table.Cell>{property.age}</Table.Cell>
              <Table.Cell>
                {property.street} {property.houseno}, {property.city}
              </Table.Cell>
              <Table.Cell>${property.current_land}</Table.Cell>
              <Table.Cell>${property.current_building}</Table.Cell>
              <Table.Cell>${property.current_total}</Table.Cell>
              <Table.Cell>
                ${parseFloat(property.building_sq_ft).toFixed()}
              </Table.Cell>
              <Table.Cell>
                ${parseFloat(property.land_sq_ft).toFixed()}
              </Table.Cell>
              <Table.Cell>${property.bldpsfv}</Table.Cell>
              <Table.Cell>${property.landpsv}</Table.Cell>
              <Table.Cell>
                <Form onSubmit={this.handleSelectSubmit}>
                  <Input
                    className='hidden'
                    id='form-input-control-property-id'
                    name='propertyId'
                    value={property.id}
                  />
                  <Input
                    className='hidden'
                    id='form-input-control-index'
                    name='keyIndex'
                    value={key}
                  />
                  <Input
                    className='hidden'
                    id='form-input-pin'
                    name='propertyPin'
                    value={property.pin}
                  />
                  <Button icon type='submit' loading={this.props.isFetching && property.pin === this.state.selectedPin}>
                    <Icon name='plus' />
                  </Button>
                </Form>
              </Table.Cell>
            </Table.Row>
          )
        })}
      </Table.Body>
    )
  }
}

PropertyFilteringData.propTypes = {
  actions: PropTypes.any,
  // sortBy: PropTypes.func.isRequired,
  property: PropTypes.any,

  // state data
  data: PropTypes.array,
  cases: PropTypes.any,
  isFetching: PropTypes.bool
  // sortKey: PropTypes.string.isRequired,
  // sortDesc: PropTypes.bool.isRequired,
  // isFetching: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  return {
    isFetching: state.selectedProperties.isFetching
  }
}

export default connect(mapStateToProps)(PropertyFilteringData)
