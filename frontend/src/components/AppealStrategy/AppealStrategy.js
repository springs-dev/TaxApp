import React from 'react'
import { Grid, Label, Accordion } from 'semantic-ui-react'
import './style.styl'
import StrategyLog from '../StrategyLog'
// Process Review

const Level1Title1 = (
  <Grid fluid>
    <Grid.Column textAlign='left' width={4}>
      <strong>Complaint: </strong>
    </Grid.Column>
    <Grid.Column width={6}>Due 23-Sept-2017</Grid.Column>
    <Grid.Column textAlign='right' width={6}>
      <Label color='teal'> COMPS</Label>
    </Grid.Column>
  </Grid>
)
const Level1Title2 = (
  <Grid fluid>
    <Grid.Column textAlign='left' width={4}>
      <strong>Re-Review:</strong>
    </Grid.Column>
    <Grid.Column width={6}>Due 22-October-2017</Grid.Column>
    <Grid.Column textAlign='right' width={6}>
      <Label color='teal'>Purchase Price</Label>
    </Grid.Column>
  </Grid>
)
const Level2Title1 = (
  <Grid>
    <Grid.Column textAlign='left' width={5}>
      <strong>Complaint: </strong>
    </Grid.Column>
    <Grid.Column width={8}>Due 23-Sept-2017</Grid.Column>
    <Grid.Column textAlign='right' width={3}>
      <Label color='teal'> TBD</Label>
    </Grid.Column>
  </Grid>
)
const Level2Title2 = (
  <Grid>
    <Grid.Column textAlign='left' width={5}>
      <strong>Re-Review:</strong>
    </Grid.Column>
    <Grid.Column width={8}>Due 22-October-2017</Grid.Column>
    <Grid.Column textAlign='right' width={3}>
      <Label color='teal'> TBD</Label>
    </Grid.Column>
  </Grid>
)
const Level1Panel1Content = (
  <Grid>
    <Grid.Row>
      <Grid.Column width={1} />

      <Grid.Column width={4}>Process</Grid.Column>
      <Grid.Column width={6} />

      <Grid.Column width={4}>
        <Label basic color='teal'>
          Appeal Sent
        </Label>
        <Label basic color='teal'>
          Results
        </Label>
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid.Row>
  </Grid>
)
const Level1Panel2Content = (
  <Grid>
    <Grid.Row>
      <Grid.Column width={1} />

      <Grid.Column width={4}>Process</Grid.Column>
      <Grid.Column width={3} />

      <Grid.Column textAlign='right' width={7}>
        <Label basic color='teal'>
          Appeal Draft
        </Label>
        <Label basic color='teal'>
          Upload Proof – Due in 10 days
        </Label>
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid.Row>
  </Grid>
)
/*  const Level2Panel1Content = (
  <Grid >
    <Grid.Row>
      <Grid.Column width={1} />

      <Grid.Column width={4}>
        Process
      </Grid.Column>
      <Grid.Column width={6} />

      <Grid.Column width={4}>
        <Label basic color='teal'> Appeal Sent</Label>
        <Label basic color='teal'> Results</Label>
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid.Row>
  </Grid>

) */
/*  const Level2Panel2Content = (
  <Grid >
    <Grid.Row>
      <Grid.Column width={1} />

      <Grid.Column width={4}>
        Process
      </Grid.Column>
      <Grid.Column width={6} />

      <Grid.Column width={4}>
        <Label basic color='teal'> Appeal Draft</Label>
        <Label basic color='teal'> Upload Proof – Due in 10 days</Label>
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid.Row>
  </Grid>

) */
const level1Panels = [
  { title: Level1Title1, content: Level1Panel1Content, key: '1' },
  { title: Level1Title2, content: Level1Panel2Content, key: '2' }
]

const Level1Content = (
  <div>
    <Accordion panels={level1Panels} />
  </div>
)

const level2Panels = [
  { title: Level2Title1, content: 'Process', key: '1' },
  { title: Level2Title2, content: 'Process', key: '2' }
]

const Level2Content = (
  <div>
    <Accordion panels={level2Panels} />
  </div>
)

const rootPanels = [
  { title: 'Assessors Office', content: Level1Content, key: '1' },
  { title: 'Board of Review', content: Level2Content, key: '2' }
]

const AppealStrategy = () => (
  <div>
    <h1> Appeal Strategy </h1>
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <div>
            <Accordion fluid panels={rootPanels} styled />
          </div>
        </Grid.Column>
        <Grid.Column textAlign='right' width={6}>
          <StrategyLog />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)

export default AppealStrategy
