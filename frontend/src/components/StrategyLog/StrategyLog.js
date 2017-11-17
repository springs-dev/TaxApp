import React from 'react'
import { Card, Statistic } from 'semantic-ui-react'
import './style.styl'

class StrategyLog extends React.Component {
  render () {
    return (
      <div>
        <Card fluid>
          <Card.Content extra>
            <Statistic.Group widths='one' size='mini'>
              <Statistic>
                <Statistic.Value>$20,000</Statistic.Value>
                <Statistic.Label>Your beginning Tax</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>$15,000</Statistic.Value>
                <Statistic.Label>Goal Tax</Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>$17,000</Statistic.Value>
                <Statistic.Label>
                  Current reduction (AO Re-Review)
                </Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Label>Accept the deal at $17,000</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Card.Content>
        </Card>
      </div>
    )
  }
}

export default StrategyLog
