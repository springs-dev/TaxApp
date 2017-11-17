import React from 'react'
import { Table, Label, Button, Popup, Modal, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class UserArgumentReview extends React.Component {
  render () {
    return (
      <container>
        <Table definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>PIN</Table.HeaderCell>
              <Table.HeaderCell>Address</Table.HeaderCell>
              <Table.HeaderCell>Township</Table.HeaderCell>
              <Table.HeaderCell>Class</Table.HeaderCell>
              <Table.HeaderCell>Appeal date</Table.HeaderCell>
              <Table.HeaderCell>Flags</Table.HeaderCell>
              <Table.HeaderCell>Actions/Docs</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Button
                  as={Link}
                  onClick={this.handleItemClick}
                  to='/taxappeal/argumentreview/singleargumentreview'
                  basic
                  color='black'
                >
                  Process
                </Button>
              </Table.Cell>
              <Table.Cell>17-06-419-018-2000</Table.Cell>
              <Table.Cell>1028 N Marshfield</Table.Cell>
              <Table.Cell>WEST TOWN</Table.Cell>
              <Table.Cell>2-07</Table.Cell>
              <Table.Cell>Nov 28, 2017</Table.Cell>
              <Table.Cell>
                <div>
                  <Popup
                    trigger={
                      <Label as='a' color='#60c9c6' tag>
                        Vacancy Case
                      </Label>
                    }
                    content={<p>test</p>}
                    on='click'
                    position='bottom center'
                    wide
                  />
                  <Label as='a' color='#60c9c6' tag>
                    Appraisal Value
                  </Label>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div>
                  <Label as='a' color='orange' tag>
                    Waiting for compliance form
                  </Label>{' '}
                  <Modal
                    trigger={
                      <Label color='orange' tag>
                        Sign Verification Affidavit
                      </Label>
                    }
                  >
                    <Modal.Header>Verification Affidavit</Modal.Header>
                    <Modal.Content scrolling />
                    <Modal.Actions>
                      <Button primary>
                        Save <Icon name='right chevron' />
                      </Button>
                    </Modal.Actions>
                  </Modal>
                </div>
              </Table.Cell>
              <Table.Cell>Not submitted</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <Button
                  as={Link}
                  onClick={this.handleItemClick}
                  to='/taxappeal/argumentreview/singleargumentreview'
                  basic
                  color='black'
                >
                  Process
                </Button>
              </Table.Cell>
              <Table.Cell>0027-0110-1005-8001</Table.Cell>
              <Table.Cell>1028 N Marshfield</Table.Cell>
              <Table.Cell>WEST TOWN</Table.Cell>
              <Table.Cell>2-07</Table.Cell>
              <Table.Cell>Nov 28, 2017</Table.Cell>
              <Table.Cell>
                <Label as='a' color='#60c9c6' tag>
                  Appraisal Value
                </Label>
              </Table.Cell>
              <Table.Cell />
              <Table.Cell>Submitted</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </container>
    )
  }
}

export default UserArgumentReview
