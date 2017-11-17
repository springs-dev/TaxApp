import React from 'react'
import { Grid } from 'semantic-ui-react'
import RadioProperty from './RadioProperty'
import PropTypes from 'prop-types'

const PropertyInfo = props => {
  // const { handleSubmit } = props
  const showData = props.pin
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={4}>
          <strong>Number of Apartments </strong>
        </Grid.Column>
        <Grid.Column width={3}>{showData.apt_desc}</Grid.Column>
        <Grid.Column width={9}>
          <RadioProperty
            name={'Number of Apartments'}
            correctValue={showData.apt_desc}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <strong>Exterior construction </strong>
        </Grid.Column>
        <Grid.Column width={3}>{showData.ext_desc}</Grid.Column>
        <Grid.Column width={9}>
          <RadioProperty
            name={'Exterior construction'}
            correctValue={'Brick'}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <strong>full baths </strong>
        </Grid.Column>
        <Grid.Column width={3}>{showData.full_bath}</Grid.Column>
        <Grid.Column width={9}>
          <RadioProperty
            name={'full baths'}
            correctValue={showData.full_bath}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <strong>½ baths</strong>
        </Grid.Column>
        <Grid.Column width={3}>{showData.half_bath}</Grid.Column>
        <Grid.Column width={9}>
          <RadioProperty
            name={'Half baths'}
            correctValue={showData.half_bath}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <strong>Basement Condition </strong>
        </Grid.Column>
        <Grid.Column width={3}>{showData.bsmt_desc}</Grid.Column>
        <Grid.Column width={9}>
          <RadioProperty
            name={'Basement Condition'}
            correctValue={showData.bsmt_desc}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <strong>Attic condition </strong>
        </Grid.Column>
        <Grid.Column width={3}>{showData.attic_desc}</Grid.Column>
        <Grid.Column width={9}>
          <RadioProperty
            name={'Attic condition'}
            correctValue={showData.attic_desc}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <strong>Air Conditioning </strong>
        </Grid.Column>
        <Grid.Column width={3}>{showData.ac}</Grid.Column>
        <Grid.Column width={9}>
          <RadioProperty name={'Air Conditioning'} correctValue={showData.ac} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <strong>Fireplaces </strong>
        </Grid.Column>
        <Grid.Column width={3}>{showData.fireplace}</Grid.Column>
        <Grid.Column width={9}>
          <RadioProperty
            name={'Fireplaces'}
            correctValue={showData.fireplace}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <strong>Garage Type</strong>
        </Grid.Column>
        <Grid.Column width={3}>{showData.gar_desc}</Grid.Column>
        <Grid.Column width={9}>
          <RadioProperty
            name={'Garage Type'}
            correctValue={showData.gar_desc}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <strong>Building SF </strong>
        </Grid.Column>
        <Grid.Column width={3}>{showData.building_sq_ft} s/f</Grid.Column>
        <Grid.Column width={9}>
          <RadioProperty
            name={'Building SF'}
            correctValue={showData.building_sq_ft + 's/f'}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <strong>Land SF </strong>
        </Grid.Column>
        <Grid.Column width={3}>{showData.land_sq_ft} s/f</Grid.Column>
        <Grid.Column width={9}>
          <RadioProperty
            name={'Land SF'}
            correctValue={showData.land_sq_ft + 's/f'}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <strong>Age (Built) </strong>
        </Grid.Column>
        <Grid.Column width={3}>{showData.age}</Grid.Column>
        <Grid.Column width={9}>
          <RadioProperty name={'Built_age'} correctValue={showData.age} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
PropertyInfo.propTypes = {
  // handleSubmit: PropTypes.func,
  // data: PropTypes.any,
  // previousPage: PropTypes.any,
  pin: PropTypes.any
  // onSubmit: PropTypes.any
}

export default PropertyInfo
