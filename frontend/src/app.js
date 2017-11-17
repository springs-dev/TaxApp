import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './containers/App'
import configureStore from './store/configureStore'

// Define the initial state properties here
const initialAppState = {
  table: {
    isFetching: false,
    allData: [], // stores the unfiltered data
    data: [], // stores data to be rendered by component
    filterString: '',
    sortDesc: false,
    sortKey: 'taxappeal'
  },
  sortProp: {
    sortBy: ''
  },
  loginProps: {
    logged: false,
    isFetching: false,
    allData: [], // stores the unfiltered data
    data: [], // stores data to be rendered by component,
    loginErrorMessage: ''
  },
  registerUserProps: {
    logged: false,
    isFetching: false,
    data: [],
    registerUserErrorMessage: ''
  },
  property: {
    isFetching: false,
    allData: [], // stores the unfiltered data
    data: [], // stores data to be rendered by component
    filterString: '',
    sortDesc: false,
    sortKey: 'taxappeal',
    direction: 'ascending'
  },
  questionnaireSecondStep: {
    data: [
      {
        'Building SF': ''
      },
      {
        'Land SF': ''
      },
      {
        Built_age: ''
      },
      {
        'Garage Type': ''
      },
      {
        Fireplaces: ''
      },
      {
        'Air Conditioning': ''
      },
      {
        'Attic condition': ''
      },
      {
        'Basement Condition': ''
      },
      {
        'Half baths': ''
      },
      {
        'full baths': ''
      },
      {
        'Exterior construction': ''
      },
      {
        'Number of Apartments': ''
      }
    ],
    pageSubmitted: ''
  },
  questionnaireThirdStep: {
    data: [
      {
        Email: ''
      },
      {
        Phone: ''
      },
      {
        Card_holder_name: ''
      },
      {
        Billing_address: ''
      },
      {
        Card_num: ''
      },
      {
        Expiration: ''
      },
      {
        CVC: ''
      }
    ],
    pageSubmitted: ''
  },
  stepData: {
    nextPage: 1
  },
  pin: {
    isFetching: false,
    allData: [], // stores the unfiltered data
    data: [], // stores data to be rendered by component
    filterString: '',
    sortDesc: false,
    sortKey: 'taxappeal'
  },
  propertySelected: {
    isFetching: false,
    allData: [], // stores the unfiltered data
    data: [], // stores data to be rendered by component
    filterString: '',
    sortDesc: false,
    sortKey: 'taxappeal'
  },
  selectedProperties: {
    isFetching: false,
    allData: [], // stores the unfiltered data
    selectedData: [], // stores data to be rendered by component
    filterString: '',
    sortDesc: false,
    sortKey: 'taxappeal'
  },
  cases: {
    isFetching: false,
    caseAll: [], // stores the unfiltered data
    caseData: [], // stores data to be rendered by component
    filterString: '',
    sortDesc: false,
    sortKey: 'taxappeal'
  },
  activeCase: {
    isFetching: false,
    caseAll: [], // stores the unfiltered data
    caseData: {}, // stores data to be rendered by component
    filterString: '',
    sortDesc: false,
    sortKey: 'taxappeal'
  },
  document: {
    isFetching: false,
    rereview: [], // stores the unfiltered data
    complaint: [],
    resappeal: [],
    ownerlesseverf: [],
    excelData: []
  },
  ranges: {
    minAge: 0,
    maxAge: 0,
    minSF: 0,
    maxSF: 0
  },
  assesstmentComparables: {
    subject_property_psfv: '',
    subject_property_square_feet: '',
    subject_property_land_av: '',
    comparable_bav_avg: '',
    requested_building_av: '',
    requested_total_av: ''
  },
  filtering: {
    classCode: '',
    township: ''
  },
  myProperties: [],
  firstName: '',
  lastName: '',
  errorMessage: null
}

const store = configureStore(initialAppState)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
