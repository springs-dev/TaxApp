import React from 'react'
import { Grid, Form, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

class ProfileInfo extends React.Component {
  render () {
    const { firstName, lastName, email, phone, address } = this.props.profileData
    return (
      <Grid columns={3}>
        <Grid.Row>
          <Grid.Column width={4} />
          <Grid.Column width={8}>
            <Form>
              <Form.Group>
                <Form.Input
                  width={8}
                  id='form-input-control-name'
                  name='name'
                  label='Name'
                  value={firstName}
                />
                <Form.Input
                  width={8}
                  id='form-input-control-lastname'
                  name='lastname'
                  label='Last Name'
                  value={lastName}
                />
              </Form.Group>
              <Form.Input
                id='form-input-control-email'
                name='email'
                label='Email'
                value={email}
              />
              <Form.Input
                id='form-input-control-phone'
                name='phone'
                label='Phone'
                value={phone}
              />
              <Form.Input
                id='form-input-control-first-name'
                name='Address'
                label=' Address'
                value={address}
              />
              <Button basic color='orange'>
                Save
              </Button>
            </Form>
          </Grid.Column>
          <Grid.Column width={4} />
        </Grid.Row>
      </Grid>
    )
  }
}

ProfileInfo.propTypes = {
  profileData: PropTypes.object
}

function mapStateToProps (state) {
  let stepsDataArray = state.questionnaireSecondStep.data
  let resultingObj = {}
  if (stepsDataArray.length > 0) {
    stepsDataArray.map(keyVal => {
      let firstSub = Object.keys(keyVal)[0]
        .split(' ')
        .join('_')
      let value = Object.values(keyVal)[0]
      resultingObj[firstSub] = value
    })
  }
  let firstName = resultingObj.Card_Holder_Name.split(' ')[0]
  let lastName = resultingObj.Card_Holder_Name.split(' ')[1]
  let profileData = {
    firstName,
    lastName,
    email: resultingObj.Email,
    phone: resultingObj.Phone,
    address: resultingObj.Billing_Address
  }
  return {
    profileData
  }
}

export default connect(mapStateToProps)(ProfileInfo)
