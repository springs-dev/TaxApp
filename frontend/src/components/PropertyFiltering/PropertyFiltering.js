import React from 'react'
import PropTypes from 'prop-types'
import { Segment, Button, Modal, Form, Label, Container, Divider, Icon, Grid, Image, Popup, Dimmer, Loader } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'

import InputRange from 'react-input-range'
import renderIf from 'render-if'
import './PropertyFiltering.styl'
class PropertyFiltering extends React.Component {
  constructor (props) {
    super()
    this.props = props
    this.state = {
      filterDataFetching: true,
      open: false,
      minAge: 0,
      maxAge: 0,
      minSf: 0,
      maxSf: 0,
      sliderChanged: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitPetitioner = this.handleSubmitPetitioner.bind(this)
    this.handleSubmitClass = this.handleSubmitClass.bind(this)
    this.handleSubmitTownship = this.handleSubmitTownship.bind(this)
    this.handleUpdateSFRange = this.handleUpdateSFRange.bind(this)
    this.handleUpdateAgeRange = this.handleUpdateAgeRange.bind(this)
  }
  fetchCondition = (nextProps, currentProps) =>
    (nextProps.minAge === currentProps.minAge &&
    nextProps.maxAge === currentProps.maxAge &&
    nextProps.minSF === currentProps.minSF &&
    nextProps.maxSF === currentProps.maxSF)

  shouldComponentUpdate (nextProps, nextState) {
    const c1 = this.fetchCondition(nextProps.ranges, this.props.ranges) // all equal
    const c2 = Object.values(nextProps.ranges).indexOf('') === -1 // and not empty string
    const c3 = nextProps.filtering.classCode !== ''
    const c4 = nextProps.filtering.township !== ''
    const c5 = nextProps.propertySelected.data.neighborhood !== ''
    return c1 && c2 && c3 && c4 && c5 && !nextProps.property.isFetching // last one important
  }

  componentDidUpdate (prevProps, prevState) {
    if (localStorage.getItem('filtering') !== true && this.props.filtering.classCode !== '' && this.props.filtering.township !== '' &&
      this.props.ranges.minAge !== '' && this.props.ranges.maxAge !== '' &&
      this.props.ranges.minSF !== '' && this.props.ranges.maxSF !== '') {
      let classCode = this.props.filtering.classCode
      let neighborhood = this.props.propertySelected.data.town ? this.props.propertySelected.data.neighborhood : '22'
      let township = this.props.filtering.township ? this.props.filtering.township : this.props.propertySelected.data.township
      let minSF = this.props.ranges.minSF ? this.props.ranges.minSF : parseInt(this.props.propertySelected.building_sq_ft) - 500
      let maxSF = this.props.ranges.maxSF ? this.props.ranges.maxSF : parseInt(this.props.propertySelected.building_sq_ft) + 500
      let minAge = this.props.ranges.minAge ? this.props.ranges.minAge : parseInt(this.props.propertySelected.age) - 25
      let maxAge = this.props.ranges.maxAge ? this.props.ranges.maxAge : parseInt(this.props.propertySelected.age) + 25
      if (this.props.property.data.length < 1 && !this.state.sliderChanged) {
        localStorage.setItem('filtering', true)
        this.setState({ filterDataFetching: this.props.properties.isFetching })
        this.props.actions.fetchaData(township, classCode, neighborhood, minSF, maxSF, minAge, maxAge)
      }
    }
  }

  componentWillMount () {
    if (this.props.property.data.length >= 1 && !this.props.properties.isFetching) {
      this.setState({ filterDataFetching: false })
    }
  }

  componentDidMount () {
    this.props.actions.fetchCaseData(this.props.cases.caseData.id)
    localStorage.setItem('filtering', false)
  }

  handleSubmit (e) {
    e.preventDefault()
    let neighborhood = e.target.neighborhood.value
    let classCode = this.props.filtering.classCode ? this.props.filtering.classCode : this.props.propertySelected.data.ovacls
    let township = this.props.filtering.township ? this.props.filtering.classCode : this.props.propertySelected.data.township
    this.props.actions.fetchaData(township, classCode, neighborhood, this.props.ranges.minSF, this.props.ranges.maxSF, this.props.ranges.minAge, this.props.ranges.maxAge)
    // (firstName, lastName)
  }

  handleSubmitClass (e) {
    e.preventDefault()
    let newClassCode = e.target.classCodeAdd.value
    let neighborhood = this.props.propertySelected.data.town
    let township = this.props.filtering.township ? this.props.filtering.classCode : this.props.propertySelected.data.township
    this.props.actions.updateClassCode(this.props.filtering.classCode, newClassCode, this.props.filtering)
    this.props.actions.fetchaData(township, newClassCode, neighborhood, this.props.ranges.minSF, this.props.ranges.maxSF, this.props.ranges.minAge, this.props.ranges.maxAge)
  }

  handleSubmitTownship (e) {
    e.preventDefault()
    let newTownship = e.target.townshipAdd.value
    let neighborhood = this.props.propertySelected.data.town
    let classCode = this.props.filtering.classCode ? this.props.filtering.classCode : this.props.propertySelected.data.ovacls
    this.props.actions.updateTownship(this.props.filtering.township, newTownship, this.props.filtering)
    this.props.actions.fetchaData(newTownship, classCode, neighborhood, this.props.ranges.minSF, this.props.ranges.maxSF, this.props.ranges.minAge, this.props.ranges.maxAge)
  }

  handleSubmitPetitioner (e) {
    e.preventDefault()
    let firstName = e.target.firstName.value
    let lastName = e.target.lastName.value
    let address = e.target.address.value
    let email = e.target.email.value
    let city = e.target.city.value
    let state = e.target.state.value
    let zip = e.target.zip.value
    let phone = e.target.phone.value

    this.props.actions.updateData(this.props.cases.caseData.id, firstName, lastName, address, email, city, state, zip, phone)
    // (firstName, lastName)
  }

  handleUpdateAgeRange () {
    const { minAge, maxAge } = this.state
    this.props.actions.updateAgeRange(minAge, maxAge, this.props.ranges)
    this.props.actions.updateByAgeRanges(minAge, maxAge)
  }

  handleUpdateSFRange () {
    const { minSf, maxSf } = this.state
    this.props.actions.updateSFRange(minSf, maxSf, this.props.ranges)
    this.props.actions.updateBySfRanges(minSf, maxSf)
  }

  handleExport = e => {
    e.preventDefault()
    const selProp = this.props.selectedProperties.selectedData.length
    const p1 = this.props.cases.caseData.firstName !== '' && this.props.cases.caseData.lastName !== ''
    const p2 = selProp >= 3 && selProp <= 5
    if (p1 && p2) {
      this.props.history.push('/taxappeal/assessment')
    } else {
      this.setState({ dimmer: 'blurring', open: true })
    }
  }

  close = () => this.setState({ open: false })

  render () {
    const pinData = this.props.propertySelected.data
    const { caseData } = this.props.cases
    return (
      <div>
        <Grid>
          <Container fluid >
            <Modal dimmer={this.state.dimmer} open={this.state.open} onClose={this.close}>
              <Modal.Header>Adding petitioner</Modal.Header>
              <Modal.Content>
                <p>You must provide first and last name, as well as select between three and five proeprties.</p>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  positive
                  icon='checkmark'
                  labelPosition='right'
                  content='OK'
                  onClick={this.close}
                />
              </Modal.Actions>
            </Modal>
            <Grid columns={2} verticalAlign='bottom' >
              <Grid.Row>
                <Grid.Column width={12}>
                  <br />
                  <h4>Property: {renderIf(caseData.firstName === '')(
                    <Modal trigger={<Button primary size='small'>Add Petitioner</Button>} closeIcon>
                      <Modal.Header>Enter Petitioner information</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Form onSubmit={this.handleSubmitPetitioner} >
                            <Form.Input id='form-input-control-first-name' name='firstName' label='First Name' placeholder='First Name' />
                            <Form.Input id='form-input-control-last-name' name='lastName' label='Last Name' placeholder='Last Name' />
                            <Form.Input id='form-input-control-last-name' name='address' label='Address' placeholder='Address' />
                            <Form.Input id='form-input-control-last-name' name='email' label='Email' placeholder='example@gmail.com' />
                            <Form.Input id='form-input-control-last-name' name='city' label='City' placeholder='City' />
                            <Form.Input id='form-input-control-last-name' name='state' label='State' placeholder='State' />
                            <Form.Input id='form-input-control-last-name' name='zip' label='Zip code' placeholder='Zip code' />
                            <Form.Input id='form-input-control-last-name' name='phone' label='Phone' placeholder='Phone' />
                            <Button type='submit' content='Save' primary />
                          </Form>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  )} {renderIf(caseData.firstName !== '' && caseData.lastName !== '')(
                    <span>{caseData.firstName} {caseData.lastName} </span>
                  )} - <Popup
                    trigger={<Image src={pinData.property_image} avatar />}
                    content={<Image src={pinData.property_image} size='large' floated='left' />}
                    position='bottom right'
                    on='hover'
                  /> {pinData.pin} - {pinData.township}</h4>
                  {/* /> {pinData.pin.slice(0, 2)}-{pinData.pin.slice(2, 4)}-{pinData.pin.slice(4, 7)}-{pinData.pin.slice(7, 11)}-{pinData.pin.slice(11, 13)} - {pinData.township}</h4> */}
                </Grid.Column>
                <Grid.Column width={4} textAlign='right' verticalAlign='bottom'>
                  <Button
                    attached='bottom'
                    size='small'
                    icon='browser'
                    primary
                    onClick={this.handleExport}
                    label='View Cart/Export' />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider />
            <Grid.Row textAlign='left' centered>
              <Container>
                <h4>Filters</h4>
              </Container>
            </Grid.Row>
            <Grid.Row textAlign='center' centered>
              <Container>
                <Segment padded>
                  <Dimmer active={this.state.filterDataFetching} inverted>
                    <Loader inverted>Loading filters</Loader>
                  </Dimmer>
                  <Form onSubmit={this.handleSubmit}>
                    <Grid columns={7} verticalAlign='middle' >
                      <Grid.Row>
                        <Grid.Column textAlign='right' width={2}>
                          <Label pointing='right'>Neighborhood</Label>
                        </Grid.Column>
                        <Grid.Column width={2}>
                          <Form.Input disabled fluid name='neighborhood' value={pinData.neighborhood} />
                        </Grid.Column>
                        <Grid.Column textAlign='left' width={2}>
                          <h5>{this.props.filtering.township ? this.props.filtering.township : pinData.township} <Modal trigger={<Icon color='teal' name='plus' />} closeIcon >
                            <Modal.Header>Enter additional township</Modal.Header>
                            <Modal.Content>
                              <Modal.Description>
                                <Form onSubmit={this.handleSubmitTownship}>
                                  {/* <Dropdown placeholder='Townships' search fluid multiple selection options={townshipOptions} /> */}
                                  <Form.Input id='form-input-control-new-township' name='townshipAdd' label='Township' placeholder='Township' />
                                  <Button type='submit' content='Save' primary />
                                </Form>
                              </Modal.Description>
                            </Modal.Content>
                          </Modal></h5>
                        </Grid.Column>

                        <Grid.Column textAlign='right' width={1}>
                          <Label pointing='right'>SF</Label>
                        </Grid.Column>
                        <Grid.Column width={2}>
                          <Form.Input disabled fluid name='squarefoot' value={parseFloat(pinData.building_sq_ft).toFixed()} />
                        </Grid.Column>
                        <Grid.Column width={2}>
                          <h5>{this.props.ranges.minSF ? this.props.ranges.minSF : parseInt(pinData.building_sq_ft) - 500} - {this.props.ranges.maxSF ? this.props.ranges.maxSF : parseInt(pinData.building_sq_ft) + 500}</h5>
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <InputRange
                            minValue={0}
                            maxValue={parseInt(pinData.building_sq_ft) + 1000}
                            value={{min: (this.state.minSf ? this.state.minSf : parseInt(pinData.building_sq_ft) - 500), max: (this.state.maxSf ? this.state.maxSf : parseInt(pinData.building_sq_ft) + 500)}}
                            onChangeComplete={(state) => { this.handleUpdateSFRange() }}
                            onChange={(state) => {
                              this.setState({
                                minSf: state.min,
                                maxSf: state.max,
                                sliderChanged: true
                              })
                            }} />
                        </Grid.Column>
                      </Grid.Row>
                      <Grid.Row>
                        <Grid.Column textAlign='right' width={2}>
                          <Label pointing='right'>Class</Label>
                        </Grid.Column>
                        <Grid.Column width={2}>
                          <Form.Input disabled fluid name='classCode' value={this.props.filtering.classCode ? this.props.filtering.classCode : pinData.ovacls} />
                        </Grid.Column>
                        <Grid.Column textAlign='left' width={2}>
                          <h5>{this.props.filtering.classCode ? this.props.filtering.classCode : pinData.ovacls}
                            <Modal trigger={<Icon color='teal' name='plus' />} closeIcon>
                              <Modal.Header>Enter additional class</Modal.Header>
                              <Modal.Content>
                                <Modal.Description>
                                  <Form onSubmit={this.handleSubmitClass}>
                                    <Form.Input id='form-input-control-new-class_code' name='classCodeAdd' label='Class Code' placeholder='Class Clode' />
                                    <Button type='submit' content='Save' primary />
                                  </Form>
                                </Modal.Description>
                              </Modal.Content>
                            </Modal></h5>
                        </Grid.Column>
                        <Grid.Column textAlign='right' width={1}>
                          <Label pointing='right'>AGE</Label>
                        </Grid.Column>
                        <Grid.Column width={2}>
                          <Form.Input disabled fluid name='age' value={pinData.age} />
                        </Grid.Column>
                        <Grid.Column width={2}>
                          <h5>{this.props.ranges.minAge ? this.props.ranges.minAge : parseInt(pinData.age) - 25} - {this.props.ranges.maxAge ? this.props.ranges.maxAge : parseInt(pinData.age) + 25}</h5>
                        </Grid.Column>
                        <Grid.Column width={5}>
                          <InputRange
                            minValue={0}
                            maxValue={parseInt(pinData.age) + 50}
                            value={{min: (this.state.minAge ? this.state.minAge : parseInt(pinData.age) - 25), max: (this.state.maxAge ? this.state.maxAge : parseInt(pinData.age) + 25)}}
                            onChangeComplete={(state) => { this.handleUpdateAgeRange() }}
                            onChange={(state) => {
                              this.setState({
                                minAge: state.min,
                                maxAge: state.max,
                                sliderChanged: true
                              })
                            }} />
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    {/* <Button type='submit' content='apply' /> */}
                  </Form>
                </Segment>
              </Container>
            </Grid.Row>
          </Container>
        </Grid>
      </div>
    )
  }
}

PropertyFiltering.propTypes = {
  // actions
  fetchaData: PropTypes.func,
  property: PropTypes.any,
  propertySelected: PropTypes.any,
  cases: PropTypes.any,
  ranges: PropTypes.any,
  filtering: PropTypes.any,
  // state data
  actions: PropTypes.any,
  data: PropTypes.array,
  properties: PropTypes.any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

export default withRouter(PropertyFiltering)
