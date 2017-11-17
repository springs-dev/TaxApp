import React from 'react'
import { Grid, Table, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class PropertySelection extends React.Component {
  constructor (props) {
    super()
    this.props = this.props
    // this.handleSubmit = this.handleSubmit.bind(this)
  }
  // componentWillMount () {
  //   this.props.fetchData()
  // }

  // handleFilterStringChange () {
  //   return (e) => {
  //     e.preventDefault()
  //     this.props.filterBy(e.target.value)
  //   }
  // }
  // handleSubmit (e) {
  //   e.preventDefault()
  //   let pin = e.target.pin.value
  //   this.props.fetchData(pin)
  // }

  render () {
    const { data } = this.props.property
    return (
      <Grid columns={3}>
        <h2> My properties </h2>
        { data.map((property, key) => {
          return (
            <Grid.Row>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>PIN</Table.HeaderCell>
                    <Table.HeaderCell>Township</Table.HeaderCell>
                    <Table.HeaderCell>Address</Table.HeaderCell>
                    <Table.HeaderCell>LAV</Table.HeaderCell>
                    <Table.HeaderCell>BAV</Table.HeaderCell>
                    <Table.HeaderCell>TAV</Table.HeaderCell>
                    <Table.HeaderCell>BSF</Table.HeaderCell>
                    <Table.HeaderCell>LSF</Table.HeaderCell>
                    <Table.HeaderCell>Bld PSFV</Table.HeaderCell>
                    <Table.HeaderCell>Land PSV</Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <Table.Row key={key}>
                    <Table.Cell>{property.pin}</Table.Cell>
                    <Table.Cell>{property.township}</Table.Cell>
                    <Table.Cell>{property.street} {property.houseno}, {property.city}</Table.Cell>
                    <Table.Cell>{property.current_land}</Table.Cell>
                    <Table.Cell>{property.current_building}</Table.Cell>
                    <Table.Cell>{property.current_total}</Table.Cell>
                    <Table.Cell>{property.building_sq_ft}</Table.Cell>
                    <Table.Cell>{property.land_sq_ft}</Table.Cell>
                    <Table.Cell>{property.bldpsfv}</Table.Cell>
                    <Table.Cell>{property.landpsv}</Table.Cell>
                    <Table.Cell><Button as={Link} to='/taxappeal/property/detail' label='In progress' /></Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Grid.Row>
          )
        }
        )}
      </Grid>
    )
  }
}

PropertySelection.propTypes = {
  // actions
  // fetchData: PropTypes.func.isRequired,
  // state data
  data: PropTypes.array.isRequired
}
export default PropertySelection
