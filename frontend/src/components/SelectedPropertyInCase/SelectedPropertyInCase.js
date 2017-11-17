import React from 'react'
import PropTypes from 'prop-types'
import { Table, Form, Input, Button, Icon } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
import './SelectedPropertyInCase.styl'
class SelectedPropertyInCase extends React.Component {
  // handleSubmit (e) {
  //   e.preventDefault()
  //   let classCode = e.target.classCode.value
  //   let neighborhood = e.target.neighborhood.value
  //   let squarefoot = e.target.squarefoot.value
  //   let age = e.target.age.value
  //   this.props.actions.fetchaData(classCode, neighborhood, squarefoot, squarefoot, age, age)
  //   // (firstName, lastName)
  // }

  // handleSubmitPetitioner (e) {
  //   e.preventDefault()
  //   let firstName = e.target.firstName.value
  //   let lastName = e.target.lastName.value

  //   this.props.actions.updateData(this.props.cases.caseData.id, firstName, lastName)
  //   // (firstName, lastName)
  // }

  handleDeselectSubmit = e => {
    e.preventDefault()
    let selectedIndex = e.target.keyIndex.value
    let propId = e.target.propertyId.value
    let selectedProperties = this.props.selectedProperties.selectedData
    let selectedProperty = selectedProperties[selectedIndex]
    let selectedPin = selectedProperty.pin
    this.props.actions.removeFromSelectedProperty(selectedPin)
    this.props.actions.deleteFromSelectedProperty(propId)
    this.props.actions.appendToProperties(selectedProperty)
  }

  render () {
    const { selectedData } = this.props.selectedProperties
    return (
      <Table.Body>
        {selectedData.map((property, key) => {
          const total =
            parseFloat(property.land_sq_ft) +
            parseFloat(property.building_sq_ft)
          return (
            <Table.Row warning key={key}>
              {/* <Table.Cell>
                {property.pin.slice(0, 2) +
                  '-' +
                  property.pin.slice(2, 4) +
                  '-' +
                  property.pin.slice(4, 7) +
                  '-' +
                  property.pin.slice(7, 11) +
                  '-' +
                  property.pin.slice(11, 14)}
              </Table.Cell> */}
              <Table.Cell>{property.pin}</Table.Cell>
              <Table.Cell>{property.township}</Table.Cell>
              <Table.Cell>{property.neighborhood}</Table.Cell>
              <Table.Cell>{property.ovacls}</Table.Cell>
              <Table.Cell>{property.class_description}</Table.Cell>
              <Table.Cell>${total}</Table.Cell>
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
                <Form onSubmit={this.handleDeselectSubmit}>
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
                  <Button icon type='submit'>
                    <Icon name='minus' />
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

SelectedPropertyInCase.propTypes = {
  selectedProperties: PropTypes.any,
  selectedData: PropTypes.any,
  cases: PropTypes.any,
  actions: PropTypes.any
}

export default SelectedPropertyInCase
