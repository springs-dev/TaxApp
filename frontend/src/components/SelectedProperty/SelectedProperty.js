import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'

class SelectedProperty extends React.Component {
  constructor (props) {
    super()
    this.props = props
    console.log(props)
  }
  render () {
    const { data } = this.props.propertySelected
    const total = parseFloat(data.land_sq_ft) + parseFloat(data.building_sq_ft)
    return (
      <Table.Body>
        <Table.Row active>
          {/* <Table.Cell>{data.pin.slice(0, 2) + '-' + data.pin.slice(2, 4) + '-' + data.pin.slice(4, 7) + '-' + data.pin.slice(7, 11) + '-' + data.pin.slice(11, 14)}</Table.Cell> */}
          <Table.Cell>{data.pin}</Table.Cell>
          <Table.Cell>{data.township}</Table.Cell>
          <Table.Cell>{data.neighborhood}</Table.Cell>
          <Table.Cell>{data.ovacls}</Table.Cell>
          <Table.Cell>{data.class_description}</Table.Cell>
          <Table.Cell>{total}</Table.Cell>
          <Table.Cell>{data.age}</Table.Cell>
          <Table.Cell>{data.street} {data.houseno}, {data.city}</Table.Cell>
          <Table.Cell>${data.current_land}</Table.Cell>
          <Table.Cell>${data.current_building}</Table.Cell>
          <Table.Cell>${data.current_total}</Table.Cell>
          <Table.Cell>{parseFloat(data.building_sq_ft).toFixed()}</Table.Cell>
          <Table.Cell>{parseFloat(data.land_sq_ft).toFixed()}</Table.Cell>
          <Table.Cell>${data.bldpsfv}</Table.Cell>
          <Table.Cell>${data.landpsv}</Table.Cell>
        </Table.Row>
      </Table.Body>
    )
  }
}

SelectedProperty.propTypes = {
  // actions
  // state data
  data: PropTypes.array,
  propertySelected: PropTypes.any
}

export default SelectedProperty
