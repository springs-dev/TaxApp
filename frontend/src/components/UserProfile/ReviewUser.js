import React from 'react'
import { Grid, Card, Image, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PropertyInfo from './PropertyInfo'

const emptyValues = {
  Number_of_Apartments: '',
  Exterior_construction: '',
  full_baths: '',
  Basement_Condition: '',
  Attic_condition: '',
  Air_Conditioning: '',
  Fireplaces: '',
  Garage_Type: '',
  Building_SF: '',
  Land_SF: '',
  Half_baths: '',
  Built_age: ''
}

const emptyData = {
  township: '',
  ovacls: '',
  class_description: '',
  pass_year: '',
  bldg_sf: ''
}

class ReviewUser extends React.Component {
  componentWillMount () {
    this.setState({
      value: [],
      propSelected: false,
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
      <div>
        <Grid columns={2}>
          <Grid.Column width={4}>
            <Card.Group>
              <Card fluid>
                <Card.Content>
                  <Card.Header>My Properties</Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Dropdown
                    placeholder='Select Property'
                    fluid
                    selection
                    onChange={this.handleChange}
                    options={this.props.allProperties}
                  />
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column width={9}>
                        <br />
                        <div>
                          <h4 style={{ color: '#60c9c6' }}> PIN: </h4>
                          <h4>{currentProperty.pin}</h4>
                        </div>
                        <h4 style={{ color: '#60c9c6' }}> ADDRESS: </h4>
                        <h4>{currentProperty.address} </h4>
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
          </Grid.Column>

          <Grid.Column width={12}>
            <PropertyInfo
              propertyData={this.state.propSelected ? this.props.resultingObj : emptyValues}
              pinDataArray={this.state.propSelected ? this.props.pinDataArray[0] : emptyData}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

ReviewUser.propTypes = {
  resultingObj: PropTypes.object,
  pinDataArray: PropTypes.array,
  allProperties: PropTypes.array
}

function mapStateToProps (state) {
  let stepsDataArray = state.questionnaireSecondStep.data
  let resultingObj = {}
  if (stepsDataArray.length > 0) {
    stepsDataArray.map(keyVal => {
      let name = Object.keys(keyVal)[0]
        .split(' ')
        .join('_')
      let value = Object.values(keyVal)[0]
      resultingObj[name] = value
    })
  }

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
    resultingObj,
    pinDataArray: state.pin.data,
    allProperties
  }
}

export default connect(mapStateToProps)(ReviewUser)
