import React from 'react'
import { Grid, Popup } from 'semantic-ui-react'
// import VacancyPopup from './components/Vacancy/VacancyPopup'
// Short info on assessment scores
class AssessmentInfo extends React.Component {
  constructor (props) {
    super()
    this.props = this.props
  }
  render () {
    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={8}>
            <Popup
              trigger={<strong>LAV </strong>}
              content='Property Land Assessed Value'
              basic
            />
          </Grid.Column>
          <Grid.Column width={8}>
          6598
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column width={8}>
            <Popup
              trigger={<strong>BAV </strong>}
              content='Property Building Assessed Value'
              basic
            />
          </Grid.Column>
          <Grid.Column width={8}>
          25414
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <Popup
              trigger={<strong>TAV </strong>}
              content='Property Total Assessed Value'
              basic
            />
          </Grid.Column>
          <Grid.Column width={8}>
          32012
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <strong>BSF</strong>
          </Grid.Column>
          <Grid.Column width={8}>
          1866
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <strong>LSF </strong>
          </Grid.Column>
          <Grid.Column width={8}>
          21996
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default AssessmentInfo
