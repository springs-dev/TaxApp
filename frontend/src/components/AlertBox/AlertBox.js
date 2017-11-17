import React from 'react'
import { Card, Feed } from 'semantic-ui-react'
import './style.styl'
// Alertbox for deadlines on form letter submissions
class AlertBox extends React.Component {
  render () {
    return (
      <div>
        <Card color='teal' fluid>
          <Card.Content>
            <Card.Header>Alert Box</Card.Header>
          </Card.Content>
          <Card.Content>
            <Feed>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content='22-Sept-2017' />
                  <Feed.Summary>
                    Assessors Office Complaint form customized
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content='24-Sept-2017' />
                  <Feed.Summary>
                    Assessors Office Complaint form customized
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>

              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content='26-Sept-2017' />
                  <Feed.Summary>Assessors Office Batch Printed</Feed.Summary>
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Content>
                  <Feed.Date content='28-Sept-2017' />
                  <Feed.Summary>
                    Board of Review Office Batch Printed
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default AlertBox
