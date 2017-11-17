import React from 'react'
import { Card, Image, Dropdown, Grid } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './style.styl'

class PropertyModalDropdown extends React.Component {
  componentWillMount () {
    this.setState({
      currentProperty: {
        pin: '',
        address: '',
        town: '',
        avatar: ''
      }
    })
  }

  handleChange = (e, { value }) => {
    let cp = this.props.pinDataArray.find(pr => pr.pin === value)
    const title =
      cp.tax_code +
      ' ' +
      cp.loc +
      ' ' +
      cp.township +
      ', ' +
      cp.city +
      ', ' +
      cp.street
    this.setState({
      currentProperty: {
        pin: cp.pin,
        address: title,
        town: cp.township,
        avatar: cp.property_image
      }
    })
  }

  render () {
    const { currentProperty } = this.state
    return (
      <Card.Group>
        <Card color='teal' fluid>
          <Card.Content>
            <Card.Header>My Properties</Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Dropdown
              options={this.props.allProperties}
              onChange={this.handleChange}
              placeholder='Select Property'
              fluid
              selection
            />
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={9}>
                  <br />
                  <div>
                    <h5> PIN:</h5>
                    <h4>{currentProperty.pin}</h4>
                  </div>
                  <h5> ADDRESS: </h5>
                  <h4>{currentProperty.address}</h4>
                  <h4>{currentProperty.town}</h4>
                </Grid.Column>
                <Grid.Column width={7}>
                  <Image
                    src={currentProperty.avatar}
                    verticalAlign='top'
                    size='medium'
                  />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
      </Card.Group>
    )
  }
}

PropertyModalDropdown.propTypes = {
  allProperties: PropTypes.array,
  pinDataArray: PropTypes.array
}

function mapStateToProps (state) {
  let allProperties = []
  const pinDataArray = state.pin.data
  if (pinDataArray.length > 0) {
    pinDataArray.map(singleData => {
      allProperties.push({
        text: singleData.pin,
        value: singleData.pin,
        image: { avatar: true, src: singleData.property_image }
      })
    })
  }

  return {
    allProperties,
    pinDataArray: state.pin.data
  }
}

export default connect(mapStateToProps)(PropertyModalDropdown)
