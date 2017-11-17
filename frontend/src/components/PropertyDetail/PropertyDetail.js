import React from 'react'
import PropTypes from 'prop-types'
import { Card, Grid, Container, Modal, Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class PropertyDetail extends React.Component {
  constructor (props) {
    super()
    this.props = this.props
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  // handleFilterStringChange () {
  //   return (e) => {
  //     e.preventDefault()
  //     this.props.filterBy(e.target.value)
  //   }
  // }
  // handleInputFirstName = () => {
  //   return (e) => {
  //     e.preventDefault()
  //     this.setProperty({firstName: e.target.value})
  //   }
  // }
  // componentWillMount () {
  //   this.props.fetchData()
  // }

  // handleFilterStringChange () {
  //   return (e) => {
  //     e.preventDefault()
  //     this.props.filterBy(e.target.value)
  //   }
  // }
  handleSubmit (e) {
    e.preventDefault()
    let firstName = e.target.firstName.value
    let lastName = e.target.lastName.value
    // this.props.setState(data, )
    this.data[0].firstName = firstName
    this.data[0].lastName = lastName
    // (firstName, lastName)
  }
  render () {
    const { data } = this.props
    return (
      <Container>
        { data.map((property, key) => {
          return (
            <Card.Group key={property.PIN}>
              <Card>
                <Card.Content>
                  <Card.Header>Petitioner</Card.Header>
                  <Card.Meta>Petitioner</Card.Meta>
                  <Card.Description>
                    <Modal trigger={<Button>Add</Button>}>
                      <Modal.Header>Enter Petitioner information</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Form onSubmit={this.handleSubmit}>
                            <Form.Input id='form-input-control-first-name' name='firstName' label='First Name' defaultValue={property.firstName} placeholder='First Name' />
                            <Form.Input id='form-input-control-last-name' name='lastName' label='Last Name' defaultValue={property.lastName} placeholder='Last Name' />
                            <Button label='Cancel' />
                            <Button type='submit' content='Save' positive />
                          </Form>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  </Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>PIN</Card.Header>
                  <Card.Meta>Property Identification Number</Card.Meta>
                  <Card.Description>{property.pin}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Township</Card.Header>
                  <Card.Meta>Township</Card.Meta>
                  <Card.Description>{property.township}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Class Code</Card.Header>
                  <Card.Meta>Property Class Code</Card.Meta>
                  <Card.Description>{property.ovacls}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Class Description</Card.Header>
                  <Card.Meta>Description for the property Class</Card.Meta>
                  <Card.Description>{property.class_description}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>S/F</Card.Header>
                  <Card.Meta>Square Feet of the property</Card.Meta>
                  <Card.Description>{property.building_sq_ft}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Age</Card.Header>
                  <Card.Meta>Property Age</Card.Meta>
                  <Card.Description>{property.age}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Street</Card.Header>
                  <Card.Meta>Property location</Card.Meta>
                  <Card.Description>{property.street} {property.houseno}, {property.city}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>LAV</Card.Header>
                  <Card.Meta>Property land assesed value</Card.Meta>
                  <Card.Description>{property.current_land}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>BAV</Card.Header>
                  <Card.Meta>Property building assessed value</Card.Meta>
                  <Card.Description>{property.current_building}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>TAV</Card.Header>
                  <Card.Meta>Property total assessed value</Card.Meta>
                  <Card.Description>{property.current_total}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>BSF</Card.Header>
                  <Card.Meta>Property building square foot</Card.Meta>
                  <Card.Description>{property.building_sq_ft}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>LSF</Card.Header>
                  <Card.Meta>Property Land square foot</Card.Meta>
                  <Card.Description>{property.land_sq_ft}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Bld PSFV</Card.Header>
                  <Card.Meta>Building per square foot value</Card.Meta>
                  <Card.Description>{property.bldpsfv}</Card.Description>
                </Card.Content>
              </Card>
              <Card>
                <Card.Content>
                  <Card.Header>Land PSV</Card.Header>
                  <Card.Meta>Land per square foot value</Card.Meta>
                  <Card.Description>{property.landpsv}</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          )
        })
        }
        <Grid columns={3}>
          <Grid.Column width={5} />
          <Grid.Column width={7}>
            <Button as={Link} to='/taxappeal/property' label='Back' />
            <Button as={Link} to='/taxappeal/property/filter' label='Next' positive />
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid>
      </Container>
    )
  }
}

PropertyDetail.propTypes = {
  // actions
  // fetchData: PropTypes.func.isRequired,
  // updateData: PropTypes.func,

  // state data
  data: PropTypes.array.isRequired
}

export default PropertyDetail
