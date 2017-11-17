import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

import Header from '../Header/Header'
import MyTaxAppealPage from '../../containers/MyTaxAppealPage'
import PropertySelectionPage from '../../containers/PropertySelectionPage'
import MyPropertiesPage from '../../containers/MyPropertiesPage'
import ImportDataPage from '../../containers/ImportDataPage'
import AssessmentComparablesPage from '../../containers/AssessmentComparablesPage'
import QuestionnaireWizardPage from '../../containers/QuestionareePage'
import PropertyFilteringPage from '../../containers/PropertyFilteringPage'

import AdminPage from '../../containers/Admin'
// import NotFoundPage from '../../containers/NotFoundPage'

import LoginPage from '../../components/Login/LoginPage'

import GuestRoute from '../../components/Routes/GuestRoute'
import UserRoute from '../../components/Routes/UserRoute'
import UserProfile from '../../components/UserProfile/UserProfile'
import HomePage from '../../components/HomePage/HomePage'

const divStyle = {
  margin: '1em 0 0 0'
}
const header = {
  position: 'fixed'
}
const RoutesApp = ({ location, loggedIn }) => (
  <div>
    <Header style={header} loggedIn={loggedIn} />
    <Route location={location} path='/taxappeal/' exact component={MyTaxAppealPage} />
    <Route
      location={location}
      path='/taxappeal/property'
      exact
      component={PropertySelectionPage}
    />
    <div style={divStyle}>
      <GuestRoute
        location={location}
        path='/taxappeal/login'
        exact
        component={LoginPage}
      />
      <UserRoute
        location={location}
        path='/taxappeal/myproperties'
        exact
        component={MyPropertiesPage}
      />
      <UserRoute
        location={location}
        path='/taxappeal/user_profile'
        exact
        component={UserProfile}
      />
      <UserRoute
        location={location}
        path='/taxappeal/dashboard'
        exact
        component={AdminPage}
      />
      <UserRoute
        location={location}
        path='/taxappeal/import'
        exact
        component={ImportDataPage}
      />
      <UserRoute
        location={location}
        path='/taxappeal/assessment'
        exact
        component={AssessmentComparablesPage}
      />
      <Route
        location={location}
        path='/taxappeal/questionaree'
        exact
        component={QuestionnaireWizardPage}
      />
      <UserRoute
        location={location}
        path='/taxappeal/property/filter/:property_id'
        exact
        component={PropertyFilteringPage}
      />
      <UserRoute location={location} path='/taxappeal/home' exact component={HomePage} />
      <UserRoute
        location={location}
        path='/taxappeal/admin'
        exact
        component={AdminPage}
      />
    </div>
  </div>
)

RoutesApp.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  loggedIn: PropTypes.any.isRequired
}

export default RoutesApp
