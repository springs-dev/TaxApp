import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class PropertyInfo extends React.Component {
  render () {
    const {
      Number_of_Apartments,
      Exterior_construction,
      full_baths,
      Basement_Condition,
      Attic_condition,
      Air_Conditioning,
      Fireplaces,
      Garage_Type,
      Building_SF,
      Land_SF,
      Half_baths,
      Built_age
    } = this.props.propertyData
    const data = this.props.pinDataArray
    const { township, ovacls, class_description, pass_year, bldg_sf } = data
    return (
      <div>
        <Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Township </strong>
              </Grid.Column>
              <Grid.Column width={8}>{township}</Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Class Code </strong>
              </Grid.Column>
              <Grid.Column width={8}>{ovacls}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Description </strong>
              </Grid.Column>
              <Grid.Column width={8}>{class_description}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>S/F</strong>
              </Grid.Column>
              <Grid.Column width={8}>{bldg_sf}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Age </strong>
              </Grid.Column>
              <Grid.Column width={8}>{pass_year}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Number of Apartments </strong>
              </Grid.Column>
              <Grid.Column width={8}>{Number_of_Apartments}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Exterior construction </strong>
              </Grid.Column>
              <Grid.Column width={8}>{Exterior_construction}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong># full baths </strong>
              </Grid.Column>
              <Grid.Column width={8}>{full_baths}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong># ½ baths</strong>
              </Grid.Column>
              <Grid.Column width={8}>{Half_baths}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Basement Condition </strong>
              </Grid.Column>
              <Grid.Column width={8}>{Basement_Condition}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Attic condition </strong>
              </Grid.Column>
              <Grid.Column width={8}>{Attic_condition}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Air Conditioning </strong>
              </Grid.Column>
              <Grid.Column width={8}>{Air_Conditioning}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong># Fireplaces </strong>
              </Grid.Column>
              <Grid.Column width={8}>{Fireplaces}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Garage Type</strong>
              </Grid.Column>
              <Grid.Column width={8}>{Garage_Type}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Building SF </strong>
              </Grid.Column>
              <Grid.Column width={8}>{Building_SF}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Land SF </strong>
              </Grid.Column>
              <Grid.Column width={8}>{Land_SF}</Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <strong>Age (Built) </strong>
              </Grid.Column>
              <Grid.Column width={8}>{Built_age}</Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

PropertyInfo.propTypes = {
  propertyData: PropTypes.object,
  pinDataArray: PropTypes.any
}

export default PropertyInfo
