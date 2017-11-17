import React from 'react'
import { Grid, List, Header } from 'semantic-ui-react'

class UploadedDocs extends React.Component {
  render () {
    return (
      <div>
        <Grid columns={2}>
          <Grid.Row>
            <Grid.Column width={8}>
              <Header as='h4'>Uploaded documents</Header>
              <List>
                <List.Item>
                  <List.Icon name='file image outline' />
                  <List.Content>
                    <List.Header as='a'>
                      Property exterior photograph
                    </List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='file pdf outline' />
                  <List.Content>
                    <List.Header as='a'>Vacancy Affidavit</List.Header>
                  </List.Content>
                </List.Item>
                <List.Item>
                  <List.Icon name='file pdf outline' />
                  <List.Content>
                    <List.Header as='a'>Appeal form</List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={8}>
              <Header as='h4'>Generated documents</Header>
              <List>
                <List.Item>
                  <List.Icon name='file pdf outline' />
                  <List.Content>
                    <List.Header as='a'>Owners leasse </List.Header>
                  </List.Content>
                </List.Item>
              </List>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

export default UploadedDocs
