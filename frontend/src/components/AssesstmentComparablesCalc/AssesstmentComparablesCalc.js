import React from 'react'
import PropTypes from 'prop-types'
import { Container, Tab, Segment, Accordion, Grid, Modal, Label, Header, Button, Form, Input } from 'semantic-ui-react'
// import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import renderIf from 'render-if'
import './style.styl'

class AssesstmentComparablesCalc extends React.Component {
  constructor (props) {
    super(props)
    this.props = props
    this.handleSubmitReReview = this.handleSubmitReReview.bind(this)
    this.handleSubmitResappealRequest = this.handleSubmitResappealRequest.bind(this)
    this.handleSubmitComplaint = this.handleSubmitComplaint.bind(this)
  }
  componentWillMount () {
    this.props.actions.calculateData(this.props.propertySelected.data, this.props.selectedProperties.selectedData, this.props.assesstmentComparables)
    // let reReviewRequest = {
    //   caseId: this.props.cases.caseData.property + '-' + this.props.cases.caseData.id,
    //   township: this.props.propertySelected.data.township,
    //   address: this.props.propertySelected.data.address,
    //   pin: this.props.propertySelected.data.pin,
    //   year: this.props.propertySelected.data.year,
    //   class: this.props.propertySelected.data.class,
    //   bsfg_sq_ft: this.props.propertySelected.data.bsf,
    //   bav_building: this.props.propertySelected.data.building_sq_ft,
    //   bld_psfv: this.props.assesstmentComparables.bldpsfv,
    //   comp_avg: this.props.assesstmentComparables.comparable_bav_avg,
    //   reduced_bav: this.props.assesstmentComparables.requested_building_av,
    //   reduced_tav: this.props.assesstmentComparables.requested_total_av
    // }
    // this.props.actions.generateDocument('rereview', reReviewRequest)
    let comparableExcelRequest = {
      pin: this.props.propertySelected.data.id,
      caseId: this.props.cases.caseData.id,
      subjectPropertyBuildingPSFV: this.props.assesstmentComparables.subject_property_psfv,
      subjectPropertySquareFeet: this.props.assesstmentComparables.subject_property_square_feet,
      subjectPropertyLandAV: this.props.assesstmentComparables.subject_property_land_av,
      comparableBavAvg: this.props.assesstmentComparables.comparable_bav_avg,
      requestedBuildingAV: this.props.assesstmentComparables.requested_building_av,
      requestedTotalAV: this.props.assesstmentComparables.requested_total_av
    }

    this.props.actions.generateExcelDocument('excel', comparableExcelRequest)

    let complaintRequest = {
      petitioner: this.props.cases.caseData.firstName + ' ' + this.props.cases.caseData.lastName,
      complaint_no: '',
      city: this.props.propertySelected.data.city,
      township: this.props.propertySelected.data.township,
      address: this.props.propertySelected.data.street + ' ' + this.props.propertySelected.data.houseno,
      pin: this.props.propertySelected.data.pin,
      age: this.props.propertySelected.data.age,
      class: this.props.propertySelected.data.ovacls,
      bsf: this.props.propertySelected.data.building_sq_ft,
      bav: this.props.propertySelected.data.current_building,
      lav: this.props.propertySelected.data.current_land,
      tav: this.props.propertySelected.data.current_total,
      bld_psfv: this.props.propertySelected.data.bldpsfv,
      proposed_psfv: this.props.assesstmentComparables.comparable_bav_avg,
      reduced_bav: this.props.assesstmentComparables.requested_building_av,
      reduced_tav: this.props.assesstmentComparables.requested_total_av
    }
    this.props.actions.generateComplaintDocument('complaint', complaintRequest)

    let resType = ''
    switch (this.props.propertySelected.data.res_type) {
      case 'One Story':
        resType = '1'
        break
      case 'Two Story':
        resType = '2'
        break
      case 'Multi-Level':
        resType = '3'
        break
      case 'Split-Level':
        resType = '4'
        break
      case '1.5 - 1.9':
        resType = '5'
        break
      default:
        resType = ''
        break
    }

    let buildingUse = ''
    let singleFamily = ''
    let sixApartments = ''
    let mixedUse = ''
    switch (this.props.propertySelected.data.bldg_use) {
      case 'Single Family':
        buildingUse = '1'
        singleFamily = 'Yes'
        sixApartments = 'Off'
        mixedUse = 'Off'
        break
      case 'Multi Family':
        buildingUse = '2'
        singleFamily = 'Off'
        sixApartments = 'Yes'
        mixedUse = 'Off'
        break
      default:
        buildingUse = '3'
        singleFamily = 'Off'
        sixApartments = 'Off'
        mixedUse = 'Yes'
        break
    }

    let basementType = ''
    let bsmtDesc = this.props.propertySelected.data.bsmt_desc !== null ? this.props.propertySelected.data.bsmt_desc.split(' and ') : ''
    let bsmtType = bsmtDesc[0]
    let bsmtFinish = bsmtDesc[1]
    switch (bsmtType) {
      case 'Slab':
        basementType = '2'
        break
      case 'Partial':
        basementType = '3'
        break
      case 'Full':
        basementType = '1'
        break
      case 'Crawl':
        basementType = '4'
        break
      default:
        basementType = ''
        break
    }
    // bsmt_desc values
    // Slab and Unfinished
    // Partial and Formal Rec. Room
    // Full and Unfinished
    // Full and Apartment
    // Full and Formal Rec. Room
    // Partial and Unfinished
    // Partial and Apartment
    // Crawl and Unfinished
    let basementFinish = ''
    switch (bsmtFinish) {
      case 'Unfinished':
        basementFinish = '3'
        break
      case 'Apartment':
        basementFinish = '2'
        break
      default:
        basementFinish = '1'
        break
    }
    let exteriorConstruction = ''
    switch (this.props.propertySelected.data.ext_desc) {
      case 'Frame':
        exteriorConstruction = '1'
        break
      case 'Masonry':
        exteriorConstruction = '2'
        break
      case 'Frame/Masonry':
        exteriorConstruction = '3'
        break
      default:
        exteriorConstruction = '4'
        break
    }
    // attic_desc
    let atticSize = ''
    let atticDesc = this.props.propertySelected.data.attic_desc !== null ? this.props.propertySelected.data.attic_desc.split(' and ') : ''
    let atticType = atticDesc !== '' ? atticDesc[0] : ''
    let atticFin = atticDesc !== '' ? atticDesc[1] : ''
    switch (atticType) {
      case 'Full':
        atticSize = '1'
        break
      case 'Partial':
        atticSize = '2'
        break
      default:
        atticSize = '3'
        break
    }
    let atticFinish = ''
    switch (atticFin) {
      case 'Apartment':
        atticFinish = '2'
        break
      case 'Living Area':
        atticFinish = '1'
        break
      default:
        atticFinish = '3'
        break
    }
    // Full and Unfinished
    // Full and Apartment
    // None
    // Partial and Unfinished
    // Full and Living Area
    // Partial and Living Area
    // Partial and Apartment

    // gar_desc
    let garageSize = ''
    let garageType = ''
    if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('Detached')) {
      garageType = '2'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('Attached')) {
      garageType = '1'
    } else {
      garageType = '0'
    }

    if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('1 Car')) {
      garageSize = '1'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('1 1/2 Car')) {
      garageSize = '2'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('2 Cars')) {
      garageSize = '3'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('2 1/2 Cars')) {
      garageSize = '4'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('3 Cars')) {
      garageSize = '5'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('3 1/2 Cars')) {
      garageSize = '6'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('4 Cars')) {
      garageSize = '7'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('4 1/2 Cars')) {
      garageSize = '8'
    } else {
      garageSize = '9'
    }
    // 2 1/2 Cars Detched
    // 2 Cars Attached
    // 1 Car Attached
    // 3 1/2 Cars Attache
    // 3 Cars Attached
    // 1 1/2 Car Detached
    // 2 1/2 Cars Attched
    // 3 Cars Detached
    // 2 Cars Detached
    // 4 Cars Attached
    // 3 1/2 Cars Detache
    // 1 1/2 Car Attached

    // 4 Cars Detached
    // 1 Car Detached

    let resappealRequest = {
      taxpayer_name: this.props.cases.caseData.firstName + ' ' + this.props.cases.caseData.lastName,
      taxpayer_address: this.props.cases.caseData.address,
      taxpayer_zip_code: this.props.cases.caseData.zip,
      // email: this.props.loginProps.data.email,
      email: this.props.cases.caseData.email,
      city: this.props.cases.caseData.city,
      state: this.props.cases.caseData.state,
      section_one: '',
      section_two: '',
      phone_number: this.props.cases.caseData.phone,
      owner: 'Yes',
      appeal_type: 'Yes',
      street_address: this.props.propertySelected.data.street,
      property_city: this.props.propertySelected.data.city,
      township: this.props.propertySelected.data.township,
      appeal: 'Yes',
      single_family: singleFamily,
      six_apartments: sixApartments,
      mixed_use: mixedUse,
      year_purchased: '',
      purchase_price: '',
      attorney_name: 'Mary Anne "Molly" Phelan',
      attorney_address: '191 N. Wacker Drive, Suite 1800',
      attorney_city: 'Chicago',
      zip: '60606',
      firm_name: 'Much Shelist, P.C.',
      firm_phone: '312-521-2679',
      taxpayer_title: '',
      attorney_fax: '',
      code: '1706',
      attorney_email: 'mphelan@muchshelist.com',
      first_property_change: this.props.propertySelected.data.pin,
      second_property_change: '',
      third_property_change: '',
      forth_property_change: '',
      fifth_property_change: '',
      sixth_property_change: '',
      comparable_pin_one: this.props.selectedProperties.selectedData.length >= 1 ? this.props.selectedProperties.selectedData[0].pin : '',
      comparable_pin_two: this.props.selectedProperties.selectedData.length >= 2 ? this.props.selectedProperties.selectedData[1].pin : '',
      comparable_pin_three: this.props.selectedProperties.selectedData.length >= 3 ? this.props.selectedProperties.selectedData[2].pin : '',
      comparable_pin_four: this.props.selectedProperties.selectedData.length >= 4 ? this.props.selectedProperties.selectedData[3].pin : '',
      comparable_pin_fifth: this.props.selectedProperties.selectedData.length >= 5 ? this.props.selectedProperties.selectedData[4].pin : '',
      appeal_reason_six: 'Yes',
      // 'Appeal Reason.0': req.query.appeal_reason_one,
      // 'Appeal Reason.1': req.query.appeal_reason_two,
      // 'Appeal Reason.2': req.query.appeal_reason_three,
      // 'Appeal Reason.3': req.query.appeal_reason_four,
      // 'Appeal Reason.4': req.query.appeal_reason_five,
      // 'Appeal Reason.0.1': req.query.appeal_reason_six,
      // 'Appeal Reason.1.1': req.query.appeal_reason_seven,
      // 'Appeal Reason.1.2': req.query.appeal_reason_eight,
      pin: this.props.propertySelected.data.pin,
      type: resType,
      use: buildingUse,
      units_no: this.props.propertySelected.data.units_tot !== null ? this.props.propertySelected.data.units_tot : 'No',
      exterior_construction: exteriorConstruction,
      central_air: this.props.propertySelected.data.ac >= 1 ? 'Yes' : 'No',
      full_baths: this.props.propertySelected.data.full_bath,
      half_baths: this.props.propertySelected.data.half_bath,
      fireplaces: this.props.propertySelected.data.fireplace,
      building_size: this.props.propertySelected.data.building_sq_ft,
      land_size: this.props.propertySelected.data.land_sq_ft,
      commercial_units: this.props.propertySelected.data.comm_units,
      property_age: this.props.propertySelected.data.age,
      basement_type: basementType,
      basement_finish: basementFinish,
      attic_size: atticSize,
      attic_finish: atticFinish,
      garage_type: garageType,
      garage_size: garageSize
    }
    this.props.actions.generateResapealDocument('resappeal', resappealRequest)
  }

  handleSubmit = (e, data) => this.state.onSubmit(data)

  handleSubmitResappealRequest (e) {
    e.preventDefault()
    let resType = ''
    switch (this.props.propertySelected.data.res_type) {
      case 'One Story':
        resType = '1'
        break
      case 'Two Story':
        resType = '2'
        break
      case 'Multi-Level':
        resType = '3'
        break
      case 'Split-Level':
        resType = '4'
        break
      case '1.5 - 1.9':
        resType = '5'
        break
      default:
        resType = ''
        break
    }

    let buildingUse = ''
    let singleFamily = ''
    let sixApartments = ''
    let mixedUse = ''
    switch (this.props.propertySelected.data.bldg_use) {
      case 'Single Family':
        buildingUse = '1'
        singleFamily = 'Yes'
        sixApartments = 'Off'
        mixedUse = 'Off'
        break
      case 'Multi Family':
        buildingUse = '2'
        singleFamily = 'Off'
        sixApartments = 'Yes'
        mixedUse = 'Off'
        break
      default:
        buildingUse = '3'
        singleFamily = 'Off'
        sixApartments = 'Off'
        mixedUse = 'Yes'
        break
    }

    let basementType = ''
    let bsmtDesc = this.props.propertySelected.data.bsmt_desc !== null ? this.props.propertySelected.data.bsmt_desc.split(' and ') : ''
    let bsmtType = bsmtDesc[0]
    let bsmtFinish = bsmtDesc[1]
    switch (bsmtType) {
      case 'Slab':
        basementType = '2'
        break
      case 'Partial':
        basementType = '3'
        break
      case 'Full':
        basementType = '1'
        break
      case 'Crawl':
        basementType = '4'
        break
      default:
        basementType = ''
        break
    }
    // bsmt_desc values
    // Slab and Unfinished
    // Partial and Formal Rec. Room
    // Full and Unfinished
    // Full and Apartment
    // Full and Formal Rec. Room
    // Partial and Unfinished
    // Partial and Apartment
    // Crawl and Unfinished
    let basementFinish = ''
    switch (bsmtFinish) {
      case 'Unfinished':
        basementFinish = '3'
        break
      case 'Apartment':
        basementFinish = '2'
        break
      default:
        basementFinish = '1'
        break
    }
    let exteriorConstruction = ''
    switch (this.props.propertySelected.data.ext_desc) {
      case 'Frame':
        exteriorConstruction = '1'
        break
      case 'Masonry':
        exteriorConstruction = '2'
        break
      case 'Frame/Masonry':
        exteriorConstruction = '3'
        break
      default:
        exteriorConstruction = '4'
        break
    }
    // attic_desc
    let atticSize = ''
    let atticDesc = this.props.propertySelected.data.attic_desc !== null ? this.props.propertySelected.data.attic_desc.split(' and ') : ''
    let atticType = atticDesc !== '' ? atticDesc[0] : ''
    let atticFin = atticDesc !== '' ? atticDesc[1] : ''
    switch (atticType) {
      case 'Full':
        atticSize = '1'
        break
      case 'Partial':
        atticSize = '2'
        break
      default:
        atticSize = '3'
        break
    }
    let atticFinish = ''
    switch (atticFin) {
      case 'Apartment':
        atticFinish = '2'
        break
      case 'Living Area':
        atticFinish = '1'
        break
      default:
        atticFinish = '3'
        break
    }
    // Full and Unfinished
    // Full and Apartment
    // None
    // Partial and Unfinished
    // Full and Living Area
    // Partial and Living Area
    // Partial and Apartment

    // gar_desc
    let garageSize = ''
    let garageType = ''
    if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('Detached')) {
      garageType = '2'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('Attached')) {
      garageType = '1'
    } else {
      garageType = '0'
    }

    if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('1 Car')) {
      garageSize = '1'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('1 1/2 Car')) {
      garageSize = '2'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('2 Cars')) {
      garageSize = '3'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('2 1/2 Cars')) {
      garageSize = '4'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('3 Cars')) {
      garageSize = '5'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('3 1/2 Cars')) {
      garageSize = '6'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('4 Cars')) {
      garageSize = '7'
    } else if (this.props.propertySelected.data.gar_desc !== null && this.props.propertySelected.data.gar_desc.includes('4 1/2 Cars')) {
      garageSize = '8'
    } else {
      garageSize = '9'
    }
    let resappealRequest = {
      taxpayer_name: e.target.taxpayer_name.value,
      taxpayer_address: e.target.taxpayer_address.value,
      taxpayer_zip_code: e.target.taxpayer_zip_code.value,
      email: e.target.taxpayer_email.value,
      city: e.target.taxpayer_city.value,
      state: e.target.taxpayer_state.value,
      section_one: '',
      section_two: '',
      phone_number: e.target.phone_number.value,
      owner: e.target.owner.value,
      appeal_type: e.target.appeal_type.value,
      street_address: e.target.street_address.value,
      property_city: e.target.property_city.value,
      township: e.target.township.value,
      appeal: e.target.appeal.value,
      single_family: e.target.single_family.value,
      six_apartments: e.target.six_apartments.value,
      mixed_use: e.target.mixed_use.value,
      year_purchased: e.target.year_purchased.value,
      purchase_price: e.target.purchase_price.value,
      attorney_name: e.target.attorney_name.value,
      attorney_address: e.target.attorney_address.value,
      attorney_city: e.target.attorney_city.value,
      zip: e.target.attorney_zip.value,
      firm_name: e.target.attorney_firm_name.value,
      firm_phone: e.target.attorney_firm_phone.value,
      taxpayer_title: e.target.taxpayer_title.value,
      attorney_fax: e.target.attorney_fax.value,
      code: e.target.attorney_code.value,
      attorney_email: e.target.attorney_email.value,
      first_property_change: e.target.pin.value,
      second_property_change: e.target.second_property_change.value,
      third_property_change: e.target.third_property_change.value,
      forth_property_change: e.target.forth_property_change.value,
      fifth_property_change: e.target.fifth_property_change.value,
      sixth_property_change: e.target.sixth_property_change.value,
      comparable_pin_one: e.target.comparable_pin_one.value,
      comparable_pin_two: e.target.comparable_pin_two.value,
      comparable_pin_three: e.target.comparable_pin_three.value,
      comparable_pin_four: e.target.comparable_pin_four.value,
      comparable_pin_fifth: e.target.comparable_pin_fifth.value,
      appeal_reason_six: e.target.appeal_reason_six.value,
      // 'Appeal Reason.0': req.query.appeal_reason_one,
      // 'Appeal Reason.1': req.query.appeal_reason_two,
      // 'Appeal Reason.2': req.query.appeal_reason_three,
      // 'Appeal Reason.3': req.query.appeal_reason_four,
      // 'Appeal Reason.4': req.query.appeal_reason_five,
      // 'Appeal Reason.0.1': req.query.appeal_reason_six,
      // 'Appeal Reason.1.1': req.query.appeal_reason_seven,
      // 'Appeal Reason.1.2': req.query.appeal_reason_eight,
      pin: this.props.propertySelected.data.pin,
      type: resType,
      use: buildingUse,
      units_no: this.props.propertySelected.data.units_tot !== null ? this.props.propertySelected.data.units_tot : 'No',
      exterior_construction: exteriorConstruction,
      central_air: this.props.propertySelected.data.ac >= 1 ? 'Yes' : 'No',
      full_baths: this.props.propertySelected.data.full_bath,
      half_baths: this.props.propertySelected.data.half_bath,
      fireplaces: this.props.propertySelected.data.fireplace,
      building_size: this.props.propertySelected.data.building_sq_ft,
      land_size: this.props.propertySelected.data.land_sq_ft,
      commercial_units: this.props.propertySelected.data.comm_units,
      property_age: this.props.propertySelected.data.age,
      basement_type: basementType,
      basement_finish: basementFinish,
      attic_size: atticSize,
      attic_finish: atticFinish,
      garage_type: garageType,
      garage_size: garageSize
    }
    this.props.actions.generateResapealDocument('resappeal', resappealRequest)
  }

  handleSubmitReReview (e) {
    e.preventDefault()
    let reReviewRequest = {
      caseId: e.target.caseId.value,
      township: e.target.township.value,
      address: e.target.address.value,
      pin: e.target.pin.value,
      year: e.target.year.value,
      class: e.target.class.value,
      bsf: e.target.bsf.value,
      bav: e.target.bav.value,
      bld_psfv: e.target.bld_psfv.value,
      comp_avg: e.target.comp_avg.value,
      reduced_bav: e.target.reduced_bav.value,
      reduced_tav: e.target.reduced_tav.value
    }
    this.props.actions.generateDocument('rereview', reReviewRequest)
  }
  handleSubmitComplaint (e) {
    let complaintRequest = {
      petitioner: e.target.petitioner.value,
      complaint_no: e.target.caseId.value,
      city: e.target.city.value,
      township: e.target.township.value,
      address: e.target.address.value,
      pin: e.target.pin.value,
      age: e.target.age.value,
      class: e.target.class.value,
      bsf: e.target.bsf.value,
      bav: e.target.bav.value,
      lav: e.target.lav.value,
      tav: e.target.tav.value,
      bld_psfv: e.target.bld_psfv.value,
      proposed_psfv: e.target.proposed_psfv.value,
      reduced_bav: e.target.reduced_bav.value,
      reduced_tav: e.target.reduced_tav.value
    }
    this.props.actions.generateComplaintDocument('complaint', complaintRequest)
  }

  render () {
    const calculation = this.props.assesstmentComparables
    const selectedProperty = this.props.propertySelected.data
    let singleFamily = ''
    let sixApartments = ''
    let mixedUse = ''
    switch (this.props.propertySelected.data.bldg_use) {
      case 'Single Family':
        singleFamily = 'Yes'
        sixApartments = 'Off'
        mixedUse = 'Off'
        break
      case 'Multi Family':
        singleFamily = 'Off'
        sixApartments = 'Yes'
        mixedUse = 'Off'
        break
      default:
        singleFamily = 'Off'
        sixApartments = 'Off'
        mixedUse = 'Yes'
        break
    }
    return (
      <Container>
        <h2> Documents </h2>
        {/* <Tab menu={{ fluid: true, vertical: true, tabular: 'left' }} panes={panes} /> */}
        <Grid>
          <Grid.Column>
            <Segment >
              <Grid.Row>
                <Grid.Column width={4}>
                  Complaint
                </Grid.Column>
                <Grid.Column width={6}>
                  {renderIf(this.props.document.complaint.docType === 'complaint')(
                    <Label as={Button} basic color='teal'>
                      <a href={'http://dev.jamax.ba/taxapi/document/download?documentName=' + this.props.document.complaint.documentName}> Preview</a>
                    </Label>
                  )}
                  <Modal trigger={<Label basic color='teal'> Customize</Label>} closeIcon>
                    <Header icon='archive' content='Edit Complaint Info' />
                    <Modal.Content>
                      <Form widths='equal' size='mini' onSubmit={this.handleSubmitComplaint}>

                        <Grid columns={3} padded>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Petitioner' name='petitioner' defaultValue={this.props.cases.caseData.firstName + ' ' + this.props.cases.caseData.lastName} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Complaint #' name='caseId' defaultValue={''} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='City' name='city' defaultValue={this.props.propertySelected.data.city} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Township' name='township' defaultValue={this.props.propertySelected.data.township} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Address' name='address' defaultValue={this.props.propertySelected.data.street + ' ' + this.props.propertySelected.data.houseno} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='PIN' name='pin' defaultValue={this.props.propertySelected.data.pin} />
                            </Grid.Column>
                          </Grid.Row>

                          <Grid.Row>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Age' name='age' defaultValue={selectedProperty.age} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Class' name='class' defaultValue={selectedProperty.ovacls} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='BSF' name='bsf' defaultValue={selectedProperty.bldpsfv} />
                            </Grid.Column>
                          </Grid.Row>

                          <Grid.Row>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='BAV' name='bav' defaultValue={this.props.propertySelected.data.current_building} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='LAV' name='lav' defaultValue={this.props.propertySelected.data.current_land} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='TAV' name='tav' defaultValue={this.props.propertySelected.data.current_total} />
                            </Grid.Column>
                          </Grid.Row>

                          <Grid.Row>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='BLD PSFV' name='bld_psfv' defaultValue={this.props.propertySelected.data.bldpsfv} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Proposed PSFV' name='proposed_psfv' defaultValue={parseFloat(this.props.assesstmentComparables.comparable_bav_avg).toFixed(2)} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Reduced Bav' name='reduced_bav' defaultValue={parseFloat(this.props.assesstmentComparables.requested_building_av).toFixed(2)} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Reduced Tav' name='reduced_tav' defaultValue={parseFloat(this.props.assesstmentComparables.requested_total_av).toFixed(2)} />
                            </Grid.Column>
                            <Grid.Column />
                            <Grid.Column />
                          </Grid.Row>

                          <br />
                          <Grid.Row>
                            <Grid.Column />
                            <Grid.Column />
                            <Grid.Column>
                              <Button primary type='submit' icon='file pdf outline' content='Generate New complaint document' />
                            </Grid.Column>
                          </Grid.Row>

                        </Grid></Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button primary>
                        Save
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  {renderIf(this.props.document.complaint.docType === 'complaint')(
                    <Label as={Button} basic color='teal'>
                      <a href={'http://dev.jamax.ba/taxapi/document/download?documentName=' + this.props.document.complaint.documentName}> Print</a>
                    </Label>
                  )}
                </Grid.Column>
                <Grid.Column width={1} />
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={1} />

                <Grid.Column width={4}>
                  Ressapeal
                </Grid.Column>
                <Grid.Column width={4} />

                <Grid.Column width={6}>
                  {renderIf(this.props.document.resappeal.docType === 'resappeal')(
                    <Label as={Button} basic color='teal'>
                      <a href={'http://dev.jamax.ba/taxapi/document/download?documentName=' + this.props.document.resappeal.documentName}> Preview</a>
                    </Label>
                  )}
                  <Modal trigger={<Label basic color='teal'> Customize</Label>} closeIcon>
                    <Header icon='archive' content='Edit Resappeal Info' />
                    <Modal.Content>
                      <Form widths='equal' size='mini' onSubmit={this.handleSubmitResappealRequest}>

                        <Grid columns={3} padded>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Tax Payer' name='taxpayer_name' defaultValue={this.props.cases.caseData.firstName + ' ' + this.props.cases.caseData.lastName} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Taxpayer Address' name='taxpayer_address' defaultValue={this.props.cases.caseData.address} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='Taxpayer zip' name='taxpayer_zip_code' defaultValue={this.props.cases.caseData.zip} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='Taxpayer City' name='taxpayer_city' defaultValue={this.props.cases.caseData.city} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Taxpayer Email' name='taxpayer_email' defaultValue={this.props.cases.caseData.email} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Taxpayer state' name='taxpayer_state' defaultValue={this.props.cases.caseData.state} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Phone Number' name='phone_number' defaultValue={this.props.cases.caseData.phone} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='Owner' name='owner' defaultValue={'Yes'} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Appeal Type' name='appeal_type' defaultValue={'Yes'} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Address' name='street_address' defaultValue={this.props.propertySelected.data.street} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='City' name='property_city' defaultValue={this.props.propertySelected.data.city} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Township' name='township' defaultValue={this.props.propertySelected.data.township} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Appeal' name='appeal' defaultValue={'Yes'} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='Single Family' name='single_family' defaultValue={singleFamily} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Six Appartments' name='six_apartments' defaultValue={sixApartments} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Mixed Use' name='mixed_use' defaultValue={mixedUse} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='Year Purchased' name='year_purchased' defaultValue={''} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Purchase Price' name='purchase_price' defaultValue={''} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Attorney Name' name='attorney_name' defaultValue={'Mary Anne "Molly" Phelan'} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='Attorney Address' name='attorney_address' defaultValue={'191 N. Wacker Drive, Suite 1800'} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Attorney City' name='attorney_city' defaultValue={'Chicago'} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Attorney Zip' name='attorney_zip' defaultValue={'60606'} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='Attorney Firm Name' name='attorney_firm_name' defaultValue={'Much Shelist, P.C.'} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Attorney Firm Phone' name='attorney_firm_phone' defaultValue={''} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Taxpayer Title' name='taxpayer_title' defaultValue={''} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='Attorney Fax' name='attorney_fax' defaultValue={''} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Attorney Code' name='attorney_code' defaultValue={'1706'} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Attorney Email' name='attorney_email' defaultValue={'mphelan@muchshelist.com'} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='Property Identification Number' name='pin' defaultValue={this.props.propertySelected.data.pin} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Property Change 2' name='second_property_change' defaultValue={''} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Property Change 3' name='third_property_change' defaultValue={''} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='Property Change 4' name='forth_property_change' defaultValue={''} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Property Change 5' name='fifth_property_change' defaultValue={''} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Property Change 6' name='sixth_property_change' defaultValue={''} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='Comparable Property 1' name='comparable_pin_one' defaultValue={this.props.selectedProperties.selectedData.length >= 1 ? this.props.selectedProperties.selectedData[0].pin : ''} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Comparable Property 2' name='comparable_pin_two' defaultValue={this.props.selectedProperties.selectedData.length >= 2 ? this.props.selectedProperties.selectedData[1].pin : ''} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Comparable Property 3' name='comparable_pin_three' defaultValue={this.props.selectedProperties.selectedData.length >= 3 ? this.props.selectedProperties.selectedData[2].pin : ''} />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column>
                              <Input fluidsize='tiny' id='form-input-control' label='Comparable Property 4' name='comparable_pin_four' defaultValue={this.props.selectedProperties.selectedData.length >= 4 ? this.props.selectedProperties.selectedData[3].pin : ''} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Comparable Property 5' name='comparable_pin_fifth' defaultValue={this.props.selectedProperties.selectedData.length >= 5 ? this.props.selectedProperties.selectedData[4].pin : ''} />
                            </Grid.Column>
                            <Grid.Column>
                              <Input fluid size='tiny' id='form-input-control' label='Overvaluation' name='appeal_reason_six' defaultValue={'Yes'} />
                            </Grid.Column>
                          </Grid.Row>
                          <br />
                          <Grid.Row>
                            <Grid.Column />
                            <Grid.Column />
                            <Grid.Column>
                              <Button primary type='submit' icon='file pdf outline' content='Generate New complaint document' />
                            </Grid.Column>
                          </Grid.Row>

                        </Grid></Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <Button primary>
                        Save
                      </Button>
                    </Modal.Actions>
                  </Modal>
                  {renderIf(this.props.document.resappeal.docType === 'resappeal')(
                    <Label as={Button} basic color='teal'>
                      <a href={'http://dev.jamax.ba/taxapi/document/download?documentName=' + this.props.document.resappeal.documentName}> Print</a>
                    </Label>
                  )}
                </Grid.Column>
                <Grid.Column width={1} />
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={1} />

                <Grid.Column width={4}>
                  Calculated data
                </Grid.Column>
                <Grid.Column width={4} />

                <Grid.Column width={6}>
                  {renderIf(this.props.document.excelData.docType === 'excel')(
                    <Label as={Button} basic color='teal'>
                      <a href={'http://dev.jamax.ba/taxapi/document/download?documentName=' + this.props.document.excelData.documentName}> Print</a>
                    </Label>
                  )}
                </Grid.Column>
                <Grid.Column width={1} />
              </Grid.Row>
            </Segment>
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column width={3} />
          <Grid.Column width={12}>
            <Segment fluid>
              <Grid>
                <Grid.Row columns={4}>
                  <Grid.Column textAlign='right' width={5}>
                    <Label pointing='right'>Subject Property Building PSFV</Label>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <NumberFormat fluid value={calculation.subject_property_psfv} thousandSeparator decimalPrecision={2} displayType={'text'} prefix={'$'} />
                  </Grid.Column>
                  <Grid.Column textAlign='right' width={5}>
                    <Label pointing='right'>Comparable BAV AVG </Label>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <NumberFormat fluid value={calculation.comparable_bav_avg} thousandSeparator decimalPrecision={2} displayType={'text'} prefix={'$'} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                  <Grid.Column textAlign='right' width={5}>
                    <Label pointing='right'>Subject Property Square Feet</Label>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <NumberFormat fluid value={calculation.subject_property_square_feet} thousandSeparator decimalPrecision={2} displayType={'text'} prefix={'$'} />
                  </Grid.Column>
                  <Grid.Column textAlign='right' width={5}>
                    <Label pointing='right'>Requested Building AV</Label>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <NumberFormat fluid value={calculation.requested_building_av} thousandSeparator decimalPrecision={2} displayType={'text'} prefix={'$'} />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={4}>
                  <Grid.Column textAlign='right' width={5}>
                    <Label pointing='right'>Subject Property Land AV </Label>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <NumberFormat fluid value={calculation.subject_property_land_av} thousandSeparator decimalPrecision={2} displayType={'text'} prefix={'$'} />
                  </Grid.Column>
                  <Grid.Column textAlign='right' width={5}>
                    <Label pointing='right'>REQUESTED TOTAL AV </Label>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <NumberFormat fluid value={calculation.requested_total_av} thousandSeparator decimalPrecision={2} displayType={'text'} prefix={'$'} />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
}

AssesstmentComparablesCalc.propTypes = {
  // actions

  pin: PropTypes.any,
  selectedProperties: PropTypes.any,
  assesstmentComparables: PropTypes.any,
  cases: PropTypes.any,
  document: PropTypes.any,
  propertySelected: PropTypes.any,
  // state data
  actions: PropTypes.any
}

export default AssesstmentComparablesCalc
