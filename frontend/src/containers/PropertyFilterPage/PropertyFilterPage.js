import React from 'react'
import PropertyFilteringPage from '../../components/PropertyFiltering'
import PropertyFilteringDataPage from '../PropertyFilteringDataPage'
import { Grid, Segment } from 'semantic-ui-react'

class PropertyFilterPage extends React.Component {
  constructor (props) {
    super()
    this.props = this.props
  }
  render () {
    return (
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>
              <PropertyFilteringPage />
            </Grid.Column>
            <Grid.Column width={16}>
              <PropertyFilteringDataPage />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default PropertyFilterPage
