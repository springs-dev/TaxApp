import React, { Component } from 'react'
import FirstStep from './Steps/FirstStep'
import SecondStep from './Steps/SecondStep'
import ThirdStep from './Steps/ThirdStep'
import FourthStep from './Steps/FourthStep'
import FifthStep from './Steps/FifthStep'
import FinalSteps from './Steps/FinalSteps'
import ValidationModal from './ValidationModal'

import { formValueSelector, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import {
  pinActions,
  propertyActions,
  caseActions,
  questionarrieActions,
  stepActions
} from '../../actions'

class WizardForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 1,
      modalOpen: false,
      headerMessage: '',
      contentMessage: ''
    }
  }

  handleModalOpen = () => this.setState({ modalOpen: true })

  handleModalClose = () => {
    this.setState({ modalOpen: false })
  }

  nextPage = e => {
    switch (this.props.nextPage) {
      case 1: {
        let caselength = this.props.case.caseData.length
        let pinlength = this.props.pin.data.length
        if (
          (pinlength === 0 && caselength === 0) ||
          (caselength === undefined && this.props.case.caseData === {}) ||
          (pinlength !== caselength && caselength !== undefined)
        ) {
          this.setState({
            modalOpen: true,
            headerMessage: 'Property selection',
            contentMessage: `Please make sure you've searched and selected a property before proceeding to the next step`
          })
        } else if (pinlength >= 1 && this.props.case.caseData !== {}) {
          this.props.actions.setNextPage(2)
        }
        break
      }
      case 2: {
        this.props.actions.questPageSubmitted(2)
        if (this.props.questionFields.filter(function (e) {
          return Object.values(e)[0] === ''
        }).length > 0) {
          this.setState({
            modalOpen: true,
            headerMessage: 'Confirm or Revise Property Details',
            contentMessage: `Please make sure you've checked all fields`
          })
        } else {
          this.props.actions.setNextPage(3)
        }
        break
      }
      case 3: {
        console.log('Condition: ', this.props.questionFields.length)
        console.log('Form data errors: ', this.props.formData.syncErrors)
        if (this.props.questionFields.length !== 21) {
          this.setState({
            modalOpen: true,
            headerMessage: 'Your contact and credit card details',
            contentMessage: `All fields are required, please add missing information`
          })
        } else {
          const submitOK =
              this.props.formData.syncErrors !== undefined
          if (!submitOK) {
            this.props.actions.setNextPage(4)
          }
          // this.setState({ page: this.state.page + 1 })
        }
        break
      }
      case 4: {
        if (this.props.questionFields.length < 30) {
          this.setState({
            modalOpen: true,
            headerMessage: 'Sales information',
            contentMessage: `All fields are required, please add missing information`
          })
        } else {
          this.setState({ page: this.state.page + 1 })
        }
        break
      }
      case 5: {
        if (this.props.questionFields.length >= 31) {
          this.setState({ page: this.state.page + 1 })
        } else {
          this.setState({
            modalOpen: true,
            headerMessage: 'Exemption information',
            contentMessage: `All fields are required, please add missing information`
          })
        }
        break
      }
      default: {
      }
    }
  }
  previousPage = () => {
    const currentPage = this.props.nextPage
    this.props.actions.setNextPage(currentPage - 1)
  }

  handleSubmit = e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.target.pin !== undefined) {
      const pin = e.target.pin.value
      this.props.actions.fetchData(pin)
    }
  }

  render () {
    const data = title => [
      {
        text: 'Select Property',
        isActive: title === 'Select Property',
        isDone: false
      },
      {
        text: 'Confirm Data',
        isActive: title === 'Confirm Data',
        isDone: false
      },
      {
        text: 'Billing Setup',
        isActive: title === 'Billing Setup',
        isDone: false
      },
      {
        text: 'Sales Info',
        isActive: title === 'Sales Info',
        isDone: false
      },
      {
        text: 'Exemptions',
        isActive: title === 'Exemptions',
        isDone: false
      },
      {
        text: 'Final steps',
        isActive: title === 'Final steps',
        isDone: false
      }
    ]
    // const { page } = this.state
    const page = this.props.nextPage
    const { modalOpen, headerMessage, contentMessage } = this.state
    return (
      <div>
        {page === 1 && (
          <div>
            <FirstStep
              data={data('Select Property')}
              nextPage={this.nextPage}
              handleSubmit={this.handleSubmit}
            />
            <ValidationModal
              modalOpened={modalOpen}
              handleClose={this.handleModalClose}
              headerMessage={headerMessage}
              contentMessage={contentMessage}
            />
          </div>
        )}
        {page === 2 && (
          <div>
            <SecondStep
              data={data('Confirm Data')}
              onSubmit={this.nextPage}
              previousPage={this.previousPage}
              handleSubmit={this.handleSubmit}
              pin={this.props.pin}
            />
            <ValidationModal
              modalOpened={modalOpen}
              handleClose={this.handleModalClose}
              headerMessage={headerMessage}
              contentMessage={contentMessage}
            />
          </div>
        )}
        {page === 3 && (
          <div>
            <ThirdStep
              data={data('Billing Setup')}
              onSubmit={this.nextPage}
              previousPage={this.previousPage}
              handleSubmit={this.handleSubmit}
            />
            <ValidationModal
              modalOpened={modalOpen}
              handleClose={this.handleModalClose}
              headerMessage={headerMessage}
              contentMessage={contentMessage}
            />
          </div>
        )}
        {this.props.nextPage === 4 && (
          <div>
            <FourthStep
              data={data('Sales Info')}
              onSubmit={this.nextPage}
              previousPage={this.previousPage}
              handleSubmit={this.handleSubmit}
            />
            <ValidationModal
              modalOpened={modalOpen}
              handleClose={this.handleModalClose}
              headerMessage={headerMessage}
              contentMessage={contentMessage}
            />
          </div>
        )}
        {page === 5 && (
          <div>
            <FifthStep
              data={data('Exemptions')}
              previousPage={this.previousPage}
              handleSubmit={this.handleSubmit}
              onSubmit={this.nextPage}
            />
            <ValidationModal
              modalOpened={modalOpen}
              handleClose={this.handleModalClose}
              headerMessage={headerMessage}
              contentMessage={contentMessage}
            />
          </div>
        )}
        {page === 6 && (
          <FinalSteps
            data={data('Final steps')}
            previousPage={this.previousPage}
            handleSubmit={this.nextPage}
            isUserLogged={this.props.isUserLogged}
          />
        )}
      </div>
    )
  }
}

WizardForm = reduxForm({
  form: 'wizard' // a unique identifier for this form
})(WizardForm)

// Decorate with connect to read form values
const selector = formValueSelector('wizard')

function mapStateToProps (state) {
  return {
    addressValue: selector(state, 'address'),
    zipValue: selector(state, 'zip'),
    pin: state.pin,
    case: state.cases,
    questionFields: state.questionnaireSecondStep.data,
    isUserLogged: state.loginProps.logged,
    nextPage: state.stepData.nextPage,
    formData: state.form.contactInfoForm
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        pinActions,
        propertyActions,
        caseActions,
        questionarrieActions,
        stepActions
      ),
      dispatch
    )
  }
}

WizardForm.propTypes = {
  actions: PropTypes.any,
  pin: PropTypes.any,
  case: PropTypes.any,
  questionFields: PropTypes.array,
  isUserLogged: PropTypes.bool,
  nextPage: PropTypes.number,
  formData: PropTypes.any
}

export default connect(mapStateToProps, mapDispatchToProps)(WizardForm)
