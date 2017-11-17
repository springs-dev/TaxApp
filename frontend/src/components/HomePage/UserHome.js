import React, { Component } from 'react'
import {
  Step,
  Grid,
  Card,
  Image,
  Segment,
  Header,
  Label
} from 'semantic-ui-react'
import AlertBox from '../AlertBox'
import AppealStrategy from '../AppealStrategy'
import PropertyModalDropdown from '../PropertyModalDropdown'
import './style.styl'

/* let data = [
  {
    'text': 'New \n Property/Questionnaire',
    'isActive': false,
    'isDone': true
  },
  {
    'text': 'Strategy Review and Preparation',
    'isActive': false,
    'isDone': true
  },
  {
    'text': 'Waiting on Proof Documents (upload)',
    'isActive': true,
    'isDone': false
  },
  {
    'text': 'First opportunity to Appeal',
    'isActive': false,
    'isDone': false
  },
  {
    'text': 'Appeal In progress (1/4)',
    'isActive': false,
    'isDone': false
  },
  {
    'text': 'Final Results',
    'isActive': false,
    'isDone': false
  }
] */
/*    <div>
      <Message fluid>
    <Header as='h1'>Process Status</Header>
    <Steps items={data} styles={{main: {fontFamily: 'Comic Sans'}, doneItem: {background: '#AAA'}, activeItem: {background: 'linear-gradient(180deg,teal 0,#3ec1c1)'}}} />
  </Message>
    </div> */
class UserHome extends Component {
  componentWillMount () {
    this.setState({
      value: []
    })
  }
  handleChange = (e, { value }) => this.setState({ value })
  render () {
    return (
      <div>
        <Segment textAlign='left'>
          <Grid>
            <Grid.Row>
              <Grid.Column floated='left' width={8}>
                <PropertyModalDropdown />
              </Grid.Column>
              <Grid.Column floated='right' width={4}>
                <Card color='teal' fluid>
                  <Card.Content>
                    <Image
                      floated='right'
                      size='small'
                      src={require('../../assets/molly.jpg')}
                    />
                    <Card.Header>Realtor</Card.Header>
                    <Card.Meta>Much Shelist, P.C.</Card.Meta>
                    <Card.Description>
                      <Grid>
                        <Grid.Row>
                          <Grid.Column width={10}>
                            <Header as='h4'>Mary Anne Phelan</Header>
                          </Grid.Column>
                          <Grid.Column width={2} />
                          <Grid.Column width={4}>
                            <Label basic color='grey'>
                              Contact
                            </Label>
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column floated='right' width={4}>
                <AlertBox />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <Card color='teal' fluid>
                  <Card.Content>
                    <Card.Header>Process Status</Card.Header>
                  </Card.Content>
                  <Card.Content extra>
                    <Step.Group fluid>
                      <Step>
                        <Step.Content>
                          <Step.Title>New </Step.Title>
                          <Step.Title>Property/Questionnaire</Step.Title>
                        </Step.Content>
                      </Step>

                      <Step>
                        <Step.Content>
                          <Step.Title>Strategy Review </Step.Title>
                          <Step.Title>and Preparation </Step.Title>
                        </Step.Content>
                      </Step>

                      <Step active>
                        <Step.Content>
                          <Step.Title>Waiting on Proof</Step.Title>
                          <Step.Title>Documents (upload) </Step.Title>
                        </Step.Content>
                      </Step>
                      <Step disabled>
                        <Step.Content>
                          <Step.Title>First opportunity </Step.Title>
                          <Step.Title> to Appeal</Step.Title>
                        </Step.Content>
                      </Step>
                      <Step disabled>
                        <Step.Content>
                          <Step.Title>Appeal In progress </Step.Title>
                          <Step.Title>(1/4)</Step.Title>
                        </Step.Content>
                      </Step>
                      <Step disabled>
                        <Step.Content>
                          <Step.Title>Final Results</Step.Title>
                        </Step.Content>
                      </Step>
                    </Step.Group>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={16}>
                <div>
                  <AppealStrategy />
                </div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    )
  }
}

export default UserHome
