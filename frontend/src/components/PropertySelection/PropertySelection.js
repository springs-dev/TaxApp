import React from 'react'
import './PropertySelection.styl'
import {
  Grid,
  Table,
  Form,
  Button,
  Input,
  Popup,
  Image,
  Header,
  Icon,
  Modal
} from 'semantic-ui-react'
import PropTypes from 'prop-types'
import renderIf from 'render-if'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class PropertySelection extends React.Component {
  state = {
    open: false,
    caseFetching: false,
    selectedPin: ''
  }

  close = () => this.setState({ open: false })

  handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    let pin = e.target.pin.value.replace(/-/g, '')
    let streetNumber = e.target.streetNumber.value
    let streetName = e.target.streetName.value
    let city = e.target.city.value
    if (pin.trim() !== '' || streetNumber.trim() !== '' || streetName.trim() !== '' || city.trim() !== '') {
      this.props.actions.fetchData(pin, streetName, streetNumber, city)
    } else {
      this.setState({ dimmer: 'blurring', open: true })
    }
  }
  handleSubmitSelect = e => {
    e.preventDefault()
    e.stopPropagation()
    let pin = e.target.pinValue.value
    this.setState({ caseFetching: this.props.caseFetching, selectedPin: pin })
    this.props.actions.openCase(pin)
  }

  getColor = pin => {
    return Object.keys(this.props.cases.caseData).length > 0 &&
      pin === this.state.selectedPin
      ? '#52bfb9'
      : 'orange'
  }

  getSign = pin => {
    return Object.keys(this.props.cases.caseData).length > 0 &&
      pin === this.state.selectedPin
      ? 'minus'
      : 'plus'
  }
  getSelectedProperty = pin => {
    return Object.keys(this.props.cases.caseData).length > 0 &&
      pin === this.state.selectedPin
  }

  render () {
    const { open, dimmer } = this.state
    const data = this.props.pin.data !== undefined ? this.props.pin.data : []
    return (
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={4} />
          <Grid.Column width={8}>
            <Form
              onSubmit={
                this.props.handleSubmit
                  ? this.props.handleSubmit
                  : this.handleSubmit
              }
            >
              <Form.Input
                id='form-input-control-pin'
                name='pin'
                label='Property Identification Number'
                placeholder='Property Identification Number'
              />

              <Header as='h4' textAlign='center'>
                {' '}
                or{' '}
              </Header>
              <Form.Group widths='equal'>
                <Form.Input
                  id='form-input-control-streetNumber'
                  name='streetNumber'
                  label='Street Number'
                  placeholder='Street Number'
                />
                <Form.Input
                  id='form-input-control-streetName'
                  name='streetName'
                  label='Street Name'
                  placeholder='Street Name'
                />
                <Form.Input
                  id='form-input-control-city'
                  name='city'
                  label='City'
                  placeholder='City'
                />
              </Form.Group>
              <Button
                style={{ background: '#60c9c6', color: 'white' }}
                fluid
                type='submit'
                content='Search'
                loading={this.props.fetching}
              />
            </Form>
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid.Row>
        <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Modal.Header>Property searching</Modal.Header>
          <Modal.Content>
            <p>You must select at least one field to start search.</p>
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
        {renderIf(data.length >= 1)(
          <Grid.Row>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>PIN</Table.HeaderCell>
                  <Table.HeaderCell>Township</Table.HeaderCell>
                  <Table.HeaderCell>Address</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.map((property, key) => {
                  return (
                    <Table.Row key={key}>
                      <Table.Cell>
                        <Popup
                          trigger={
                            <Image src={property.property_image} avatar />
                          }
                          content={
                            <Image src={property.property_image} fluid />
                          }
                          position='bottom right'
                          on='hover'
                        />
                        {property.pin}
                      </Table.Cell>
                      <Table.Cell>{property.township}</Table.Cell>
                      <Table.Cell>
                        {property.street} {property.houseno}, {property.city}
                      </Table.Cell>
                      <Table.Cell>Available</Table.Cell>
                      <Table.Cell>
                        <Form onSubmit={this.handleSubmitSelect}>
                          <Input
                            className='hidden'
                            id='form-input-control-first-name'
                            name='pinSelected'
                            value={property.id}
                          />
                          <Input
                            className='hidden'
                            id='form-input-control-pin'
                            name='pinValue'
                            value={property.pin}
                          />
                          <Button
                            icon={this.getSign(property.pin) + ' chevron'}
                            type='submit'
                            style={{
                              background: this.getColor(property.pin),
                              color: 'white'
                            }}
                            loading={
                              this.props.caseFetching &&
                              property.pin === this.state.selectedPin
                            }
                          />
                        </Form>
                        { this.getSelectedProperty(property.pin)
                          ? (<Button
                            style={{
                              background: 'orange',
                              color: 'white'
                            }}
                            labelPosition='right'
                            icon='right chevron'
                            content='Next'
                            onClick={e => {
                              e.preventDefault()
                              if (this.state.selectedPin === '') {
                                this.setState({ dimmer: 'blurring', open: true })
                              } else {
                                this.props.history.push(
                                  'property/filter/' + property.id
                                )
                              }
                            }}
                          />) : ''}
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table>
          </Grid.Row>
        )}
      </Grid>
    )
  }
}

PropertySelection.propTypes = {
  // actions
  fetchData: PropTypes.func,
  // state data
  pin: PropTypes.any,
  actions: PropTypes.any,
  handleSubmit: PropTypes.func,
  showNextButton: PropTypes.bool,
  fetching: PropTypes.bool,
  caseFetching: PropTypes.bool,
  cases: PropTypes.any,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
}

function mapStateToProps (state) {
  return {
    pin: state.pin,
    cases: state.cases,
    fetching: state.pin.isFetching,
    caseFetching: state.cases.isFetching
  }
}

export default withRouter(connect(mapStateToProps)(PropertySelection))
