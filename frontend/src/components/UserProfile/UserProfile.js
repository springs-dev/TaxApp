import React, { Component } from 'react'
import { Tab } from 'semantic-ui-react'
import UploadedDocs from './UploadedDocs'
import UserArgumentReview from './UserArgumentReview'
import ProfileInfo from './ProfileInfo'
import PaymentsInfo from './PaymentsInfo'
import ReviewUser from './ReviewUser'

const panes = [
  {
    menuItem: 'Basic Info',
    render: () => (
      <Tab.Pane>
        <ProfileInfo />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Payment Info',
    render: () => (
      <Tab.Pane>
        <PaymentsInfo />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Review',
    render: () => (
      <Tab.Pane>
        <ReviewUser />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'My documents and uploads',
    render: () => (
      <Tab.Pane>
        <UploadedDocs />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Argument Review',
    render: () => (
      <Tab.Pane>
        <UserArgumentReview />
      </Tab.Pane>
    )
  }
]

class UserProfile extends Component {
  state = { activeIndex: 0 }

  handleRangeChange = e => this.setState({ activeIndex: e.target.value })
  handleTabChange = (e, { activeIndex }) => this.setState({ activeIndex })

  render () {
    const { activeIndex } = this.state
    return (
      <div>
        <Tab
          menu={{ fluid: true, vertical: true, tabular: 'left' }}
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={this.handleTabChange}
        />
      </div>
    )
  }
}

export default UserProfile
