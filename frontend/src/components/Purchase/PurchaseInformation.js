import React, { Component } from 'react'
import {
  Form,
  Segment,
  Button,
  Input,
  Grid,
  Radio,
  Message
} from 'semantic-ui-react'
import { FileUpload } from 'redux-file-upload'
import DistressedSale from './DistressedSale'
import DropDownDP from './DropdownDP'
import PropTypes from 'prop-types'

import { questionarrieActions } from '../../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
require('./PurchaseInfo.styl')

class PurchaseInformation extends Component {
  constructor (props) {
    super(props)
    this.state = {
      value: '',
      name: ''
    }
  }

  handleChange = (e, formData) => {
    this.setState({ value: formData.value })
    if (formData.label === 'Yes' || formData.label === 'No') {
      this.props.actions.setQuestionFourthLevel(
        'Purchased five yrs ago',
        formData.label
      )
    }
  }

  handlePrice = (e, data) => {
    this.props.actions.setQuestionFourthLevel(data.placeholder, data.value)
  }

  render () {
    const { value } = this.state
    return (
      <Form>
        <h3 style={{ color: '#60c9c6' }}>Purchase Information</h3>
        <Segment>
          <Form.Group inline>
            <label>Was this Property Purchased in the last Five Years?</label>
            <Form.Field
              control={Radio}
              label='Yes'
              value='1'
              checked={value === '1'}
              onChange={this.handleChange}
            />
            <Form.Field
              control={Radio}
              label='No'
              value='0'
              checked={value === '0'}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group widths='equal'>
            <Form.Field
              control={Input}
              label='Purchase Price'
              type='number'
              placeholder='Price'
              onChange={this.handlePrice}
            />
          </Form.Group>
          <Form.Field label='Purchase date' />
          <DropDownDP
            setQuestionFourthLevel={this.props.actions.setQuestionFourthLevel}
          />
          <br />
          <DistressedSale setQuestionFourthLevel={this.props.actions.setQuestionFourthLevel} />
          <h4 style={{ color: 'orange' }}>Upload purchase documents</h4>
          <h5>
            If you have your purchase documents ready, upload now – or we will
            remind you to upload later
          </h5>
          <Grid>
            <Grid.Column width={4} />
            <Grid.Column width={8}>
              <Message size='massive' color='teal'>
                <FileUpload
                  allowedFileTypes={['jpg', 'pdf']}
                  data={{ type: 'picture' }}
                  dropzoneId='fileUpload'
                  url='https:/url.org/api/docs/upload'
                >
                  <Button icon='upload' label='Click or drag here' />
                </FileUpload>
              </Message>
            </Grid.Column>
            <Grid.Column width={4} />
          </Grid>
        </Segment>
      </Form>
    )
  }
}

PurchaseInformation.propTypes = {
  actions: PropTypes.any
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign({}, questionarrieActions),
      dispatch
    )
  }
}

export default connect(null, mapDispatchToProps)(PurchaseInformation)
