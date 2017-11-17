import React from 'react'
import { reduxForm } from 'redux-form'
import PropTypes from 'prop-types'
import validate from '../validate'
import Steps from 'react-steps'
import {
  Tab,
  Container,
  Progress,
  Grid,
  Button,
  Image,
  Label,
  Segment
} from 'semantic-ui-react'
import PropertyInfo from '../../PropertyInfo/PropertyInfo'
import './SecondStep.styl'
const SecondStep = props => {
  const { handleSubmit, previousPage } = props
  const { data } = props
  const city = props.pin.data[0].city
  const showData = props.pin.data[0]
  const panes1 = [
    {
      menuItem: 'Property Info',
      render: () => (
        <Tab.Pane>
          <PropertyInfo
            pin={showData} />
        </Tab.Pane>
      )
    }
  ]
  // https://maps.googleapis.com/maps/api/staticmap?center=22028,+NW,+Maine,+Wisconsin,+DesPlaines,+IL+60016,+USA&zoom=16&size=600x400&markers=color:blue%7Clabel:Property%7CWisconsin+Dr,+Des+Plaines,+IL+60016,+USA&key=AIzaSyAdsrQv3x-aye4lu7dckAkuuHJ0CJQFaK4
  const googleMap =
    'https://maps.googleapis.com/maps/api/staticmap?center=' +
    showData.houseno + ',+' + showData.loc + ',+' + showData.township + ',+' +
    showData.city + ',+' + showData.street +
    ',+IL+60016,+USA&zoom=16&size=1000x345&markers=color:blue%7Clabel:Property%7C' +
    showData.houseno + ',+' + showData.loc + ',+' + showData.township + ',+' +
    showData.city + ',+' + showData.street +
    'IL+60016,+USA&key=AIzaSyAdsrQv3x-aye4lu7dckAkuuHJ0CJQFaK4'
  const title =
    showData.houseno + ' ' + showData.loc + ' ' + showData.township + ', ' +
    showData.city

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Container>
          <Steps items={data} type={'circle'} flat />
          <Progress percent={18} color='orange' />
          <div>
            <h2>Confirm or Revise Property Details (Characteristics) </h2>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column width={5}>
                  <Segment raised>
                    <Image
                      src={showData.property_image}
                      verticalAlign='top'
                      size='large'
                    />
                    <br /><br />
                    <Label as='a' style={{ background: '#f7b733' }} ribbon>  PIN:</Label>
                    <span><h5 style={{paddingLeft: '25px'}}>{showData.pin}</h5></span>
                    <Label as='a' style={{ background: '#f7b733' }} ribbon>  Address:</Label>
                    <span><h5 style={{paddingLeft: '25px'}}>{title}<br />{showData.street}</h5></span>
                    <Label as='a' style={{ background: '#f7b733' }} ribbon>  City:</Label>
                    <span><h5 style={{paddingLeft: '25px'}}>{city}</h5></span>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={11}>
                  <Segment>
                    <Image fluid src={googleMap} />
                  </Segment>
                </Grid.Column>

              </Grid.Row>
            </Grid>
            <br />
            <Tab
              menu={{ color: '#60c9c6', inverted: true }}
              panes={panes1}
              defaultActiveIndex={0}
            />
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column width={5} />
                <Grid.Column textAlign='center' width={6}>
                  <br />
                  <Button.Group>
                    <Button
                      basic
                      color='orange'
                      onClick={previousPage}
                      labelPosition='left'
                      icon='left chevron'
                      content='Back'
                    />
                    <Button
                      basic
                      color='orange'
                      onClick={props.onSubmit}
                      labelPosition='right'
                      icon='right chevron'
                      content='Forward'
                    />
                  </Button.Group>
                </Grid.Column>
                <Grid.Column width={5} />
              </Grid.Row>
            </Grid>
          </div>
        </Container>
      </div>
    </form>
  )
}

SecondStep.propTypes = {
  handleSubmit: PropTypes.func,
  data: PropTypes.any,
  previousPage: PropTypes.any,
  pin: PropTypes.any,
  onSubmit: PropTypes.any
}

export default reduxForm({
  form: 'wizard', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(SecondStep)
