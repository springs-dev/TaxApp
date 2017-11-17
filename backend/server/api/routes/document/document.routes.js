let Document = require('./../../models/document')
let SelectedProperties = require('./../../models/selected_properties')
let pdfFiller = require('node-pdffiller')
const excel = require('node-excel-export')
let fs = require('fs')

/**
 * Add two numbers.
 * @param {object} req The first number.
 * @param {object} res The second number.
 */
function createCase (req, res) {
  let cases =
  { firstName: '',
    lastName: '',
    property: req.query.propertyId }
  Document.forge(cases)
    .save()
    .then((cases) => {
      res.status(200).json(cases)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({error: true, data: {error: err, message: err.message}})
    })
}
function generateDoc (req, res) {
  let data = {}
  let sourcePDF = ''
  switch (req.query.documentType) {
    // case 'rereview':
    //   sourcePDF = './server/documents/source/rereviewtemplate.pdf'
    //   data = {

    //     'Complaint_no': req.query.caseId,
    //     'Township': req.query.township,
    //     'Address': req.query.address,
    //     'PIN': req.query.pin,
    //     'Year': req.query.year,
    //     'Class': req.query.class,
    //     'bsf': req.query.bsf,
    //     'bav': req.query.bav,
    //     'bld_psfv': req.query.bld_psfv,
    //     'comp_avg': req.query.comp_avg,
    //     'reduced_bav': req.query.reduced_bav,
    //     'reduced_tav': req.query.reduced_tav
    //   }
    //   break
    case 'complaint':
      sourcePDF = './server/documents/source/complainttemplate.pdf'
      data = {
        'Petitioner': req.query.petitioner,
        'Complaint_no': req.query.complaint_no,
        'City': req.query.city,
        'Township': req.query.township,
        'Address': req.query.address,
        'PIN': req.query.pin,
        'age': req.query.age,
        'class': req.query.class,
        'bsf': req.query.bsf,
        'bav': req.query.bav,
        'lav': req.query.lav,
        'tav': req.query.tav,
        'bld_psfv': req.query.bld_psfv,
        'proposed_psfv': req.query.proposed_psfv,
        'reduced_bav': req.query.reduced_bav,
        'reduced_tav': req.query.reduced_tav
      }
      break
    // case 'ownerlesseverf':
    //   sourcePDF = './server/documents/source/ownerlesseverf_backup.pdf'
    //   data = {
    //     'Appeal Year': req.query.appeal_year,
    //     'City': req.query.city,
    //     'Owner State': req.query.owner_state,
    //     'Owner Zip': req.query.owner_zip,
    //     'Owner City': req.query.owner_city,
    //     'State': req.query.state,
    //     'Zip': req.query.zip,
    //     'Daytime Phone Number': req.query.daytime_phone,
    //     'Email Address': req.query.email,
    //     'Township': req.query.township,

    //     'Owner': req.query.owner,
    //     'Appeal Number': req.query.caseId,
    //     'Town': req.query.town,
    //     "Owner's Mailing Address": req.query.owner_mailing_address,
    //     'Property Street Address': req.query.property_address,
    //     'Property Index Number 1': req.query.pin,

    //     'Affiant': req.query.affiant,
    //     'Tax Buyer Year': req.query.tax_buyer_year,
    //     'Reason': req.query.reason,
    //     'Officer': req.query.officer,
    //     'Purchased': req.query.purchased,
    //     'Refinanced': req.query.refinanced,
    //     'Date of Purchase': req.query.purchased_date,
    //     'Purchase Price': req.query.purchased_price,
    //     'Rate': req.query.rate,
    //     'Interest Rate': req.query.interested_rate,
    //     'Assessment Year': req.query.assesstment_year,
    //     'Date': req.query.date
    //   }
    //   break

    case 'resappeal':
      sourcePDF = './server/documents/source/resappeal.pdf'
      data = {
        'taxpayer_name': req.query.taxpayer_name,
        'taxpayer_address': req.query.taxpayer_address,
        'taxpayer_zip_code': req.query.taxpayer_zip_code,
        'email': req.query.email,
        'city': req.query.city,
        'state': req.query.state,
        'section_one': req.query.section_one,
        'phone_number': req.query.phone_number,
        'owner': req.query.owner,
        'appeal_type': req.query.appeal_type,
        'street_address': req.query.street_address,
        'property_city': req.query.property_city,
        'township': req.query.township,
        'appeal': req.query.appeal,
        'single_family': req.query.single_family,
        'six_apartments': req.query.six_apartments,
        'mixed_use': req.query.mixed_use,
        'section_two': req.query.section_two,
        'year_purchased': req.query.year_purchased,
        'purchase_price': req.query.purchase_price,
        'attorney_name': req.query.attorney_name,
        'attorney_address': req.query.attorney_address,
        'attorney_city': req.query.attorney_city,
        'zip': req.query.zip,
        'firm_name': req.query.firm_name,
        'firm_phone': req.query.firm_phone,
        'taxpayer_title': req.query.taxpayer_title,
        'attorney_fax': req.query.attorney_fax,
        'code': req.query.code,
        'attorney_email': req.query.attorney_email,
        '1' : req.query.first_property_change,
        '2' : req.query.second_property_change,
        '3' : req.query.third_property_change,
        '4' : req.query.forth_property_change,
        '5' : req.query.fifth_property_change,
        '6': req.query.sixth_property_change,
        'ComparablePIN.0': req.query.comparable_pin_one,
        'ComparablePIN.1': req.query.comparable_pin_two,
        'ComparablePIN.2': req.query.comparable_pin_three,
        'ComparablePIN.3': req.query.comparable_pin_four,
        'ComparablePIN.4': req.query.comparable_pin_fifth,
        'AppealReason.0': 'Yes',
        'AppealReason.1': 'Off',
        'AppealReason.2': 'Off',
        'AppealReason.3': 'Off',
        'AppealReason.4': 'Off',
        // 'AppealReason.0.1' : 'Off',
        'AppealReason.1.1': 'Off',
        'AppealReason.1.2': 'Off',
        // 'AppealReason.0': req.query.appeal_reason_one,
        // 'AppealReason.1': req.query.appeal_reason_two,
        // 'AppealReason.2': req.query.appeal_reason_three,
        // 'AppealReason.3': req.query.appeal_reason_four,
        // 'AppealReason.4': req.query.appeal_reason_five,
        'AppealReason.0.1': req.query.appeal_reason_six,
        // 'AppealReason.1.1': req.query.appeal_reason_seven,
        // 'AppealReason.1.2': req.query.appeal_reason_eight,
        'Property Index Number': req.query.pin,
        'Type of Residence': req.query.type,
        'Use': req.query.use,
        'Number of Units': req.query.units_no,
        'Exterior Construction': req.query.exterior_construction,
        'Central Air': req.query.central_air,
        'Number of Full Baths': req.query.full_baths,
        'Number of Half Baths': req.query.half_baths,
        'Number of Fireplaces': req.query.fireplaces,
        'Approximate Building Size': req.query.building_size,
        'Approximate Land Size': req.query.land_size,
        'Number of Commercial Units': req.query.commercial_units,
        'Approximate Age of Home': req.query.property_age,
        'Foundation or Basement Type': req.query.basement_type,
        'Basement Finish': req.query.basement_finish,
        'Attic Size': req.query.attic_size,
        'Attic Finish': req.query.attic_finish,
        'Garage Type': req.query.garage_type,
        'Garage Size': req.query.garage_size
      }
      break
    default:
      break
  }

  let documentName = req.query.documentType + '-' + req.query.pin + '.pdf'
  let destinationPDF = './server/documents/generated/' + documentName

  console.log(sourcePDF)
  console.log(destinationPDF)
  console.log(data)

  pdfFiller.fillForm(sourcePDF, destinationPDF, data, function (err) {
    if (err) throw err
    console.log('done')
    res.status(200)
      .json({docType: req.query.documentType, documentName: documentName})
  })
}

function generateExcelFromComparables (req, res) {
  // You can define styles as json object 
// More info: https://github.com/protobi/js-xlsx#cell-styles 
  const styles = {
    headerDark: {
      fill: {
        fgColor: {
          rgb: 'a5d4cf'
        }
      },
      font: {
        color: {
          rgb: '00000000'
        },
        sz: 14,
        bold: true
        // underline: true
      }
    }
  }
  // Array of objects representing heading rows (very top) 
  // const heading = [
  //   [{value: 'a1', style: styles.headerDark}, {value: 'b1', style: styles.headerDark}, {value: 'c1', style: styles.headerDark}],
  //   ['a2', 'b2', 'c2'] // <-- It can be only values 
  // ]
  // Here you specify the export structure 
  const specification = {
    propertyPin: { // <- the key should match the actual data key 
      displayName: 'Property Identification Number', // <- Here you specify the column header 
      headerStyle: styles.headerDark, // <- Header style 
      // cellStyle: function (value, row) { // <- style renderer function 
      //   // if the status is 1 then color in green else color in red 
      //   // Notice how we use another cell value to style the current one 
      //   return (row.status_id === 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible  
      // },
      width: 250 // <- width in pixels 
    },
    township: {
      displayName: 'Township',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 90 // <- width in chars (when the number is passed as string) 
    },
    neighborhood: {
      displayName: 'Neighborhood',
      headerStyle: styles.headerDark,
      // cellStyle: styles.cellPink, // <- Cell style 
      width: 120 // <- width in pixels 
    },
    classCode: {
      displayName: 'Class Code',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 90 // <- width in chars (when the number is passed as string) 
    },
    classDescription: {
      displayName: 'Class Description',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 350// <- width in chars (when the number is passed as string) 
    },
    squareFeet: {
      displayName: 'S/F',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 100 // <- width in chars (when the number is passed as string) 
    },
    age: {
      displayName: 'Age',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 65 // <- width in chars (when the number is passed as string) 
    },
    address: {
      displayName: 'Address',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 220 // <- width in chars (when the number is passed as string) 
    },
    lav: {
      displayName: 'LAV',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 100 // <- width in chars (when the number is passed as string) 
    },
    bav: {
      displayName: 'BAV',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 100 // <- width in chars (when the number is passed as string) 
    },
    tav: {
      displayName: 'TAV',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 100 // <- width in chars (when the number is passed as string) 
    },
    bsf: {
      displayName: 'BSF',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 100 // <- width in chars (when the number is passed as string) 
    },
    lsf: {
      displayName: 'LSF',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 100 // <- width in chars (when the number is passed as string) 
    },
    bldPSFV: {
      displayName: ' Bld PSFV',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 100 // <- width in chars (when the number is passed as string) 
    },
    landPSFV: {
      displayName: 'Land PSV',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 100 // <- width in chars (when the number is passed as string) 
    }
  }
  const specificationCalculation = {
    subjectPropertyBuildingPSFV: { // <- the key should match the actual data key 
      displayName: 'Subject Property Building PSFV', // <- Here you specify the column header 
      headerStyle: styles.headerDark, // <- Header style 
      // cellStyle: function (value, row) { // <- style renderer function 
      //   // if the status is 1 then color in green else color in red 
      //   // Notice how we use another cell value to style the current one 
      //   return (row.status_id === 1) ? styles.cellGreen : {fill: {fgColor: {rgb: 'FFFF0000'}}}; // <- Inline cell style is possible  
      // },
      width: 250 // <- width in pixels 
    },
    subjectPropertySquareFeet: {
      displayName: 'Subject Property Square Feet',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 250 // <- width in chars (when the number is passed as string) 
    },
    subjectPropertyLandAV: {
      displayName: 'Subject Property Land AV',
      headerStyle: styles.headerDark,
      // cellStyle: styles.cellPink, // <- Cell style 
      width: 220 // <- width in pixels 
    },
    comparableBavAvg: {
      displayName: 'Comparable BAV AVG',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 220 // <- width in chars (when the number is passed as string) 
    },
    requestedBuildingAV: {
      displayName: 'Requested Building AV',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 220// <- width in chars (when the number is passed as string) 
    },
    requestedTotalAV: {
      displayName: 'REQUESTED TOTAL AV',
      headerStyle: styles.headerDark,
      // cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property 
      //   return (value === 1) ? 'Active' : 'Inactive';
      // },
      width: 220 // <- width in chars (when the number is passed as string) 
    }
  }
  // The data set should have the following shape (Array of Objects) 
  // The order of the keys is irrelevant, it is also irrelevant if the 
  // dataset contains more fields as the report is build based on the 
  // specification provided above. But you should have all the fields 
  // that are listed in the report specification 
  const dataset = []
  const datasetComparable = [
    {
      subjectPropertyBuildingPSFV: req.query.subjectPropertyBuildingPSFV,
      subjectPropertySquareFeet: req.query.subjectPropertySquareFeet,
      subjectPropertyLandAV: req.query.subjectPropertyLandAV,
      comparableBavAvg: req.query.comparableBavAvg,
      requestedBuildingAV: req.query.requestedBuildingAV,
      requestedTotalAV: req.query.requestedTotalAV
    }
  ]

  SelectedProperties.byCaseId(req.query.caseId).then(function (properties) {
    let property = {}
    properties.forEach(selectedProperty => {
      console.log(selectedProperty)
      property = {
        propertyPin: selectedProperty.attributes.pin,
        township: selectedProperty.attributes.township,
        neighborhood: selectedProperty.attributes.neighborhood,
        classCode: selectedProperty.attributes.ovacls,
        classDescription: selectedProperty.attributes.class_description,
        squareFeet: parseInt(selectedProperty.attributes.land_sq_ft) + parseInt(selectedProperty.attributes.building_sq_ft),
        age: selectedProperty.attributes.age,
        address: selectedProperty.attributes.street + ' ' + selectedProperty.attributes.houseno + ' ' + selectedProperty.attributes.city,
        lav: selectedProperty.attributes.current_land,
        bav: selectedProperty.attributes.current_building,
        tav: selectedProperty.attributes.current_total,
        bsf: selectedProperty.attributes.building_sq_ft,
        lsf: selectedProperty.attributes.land_sq_ft,
        bldPSFV: selectedProperty.attributes.bldpsfv,
        landPSFV: selectedProperty.attributes.landpsv
      }
      dataset.push(property)
    })
    // Define an array of merges. 1-1 = A:1 
    // The merges are independent of the data. 
    // A merge will overwrite all data _not_ in the top-left cell. 
    // const merges = [
    //   { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
    //   { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
    //   { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
    // ]
    // Create the excel report. 
    // This function will return Buffer 

    const report = excel.buildExport(
      [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report 
        {
          name: 'COMPARABLE PROPERTY DETAILS', // <- Specify sheet name (optional) 
          // heading: heading, // <- Raw heading array (optional) 
          // merges: merges, // <- Merge cell ranges 
          specification: specification, // <- Report specification 
          data: dataset // <-- Report data 
        },
        {
          name: 'COMPARABLE CALCULATED VALUES', // <- Specify sheet name (optional) 
          // heading: heading, // <- Raw heading array (optional) 
          // merges: merges, // <- Merge cell ranges 
          specification: specificationCalculation, // <- Report specification 
          data: datasetComparable // <-- Report data 
        }
      ]
    )
    let documentName = 'ComparableAssestment-' + req.query.pin + '.xlsx'
    let documentPath = './server/documents/generated/' + documentName
    fs.writeFile(documentPath, report, (err) => {
      if (err) {
        res.status(500)
          .json(err)
      } else {
        res.status(200)
          .json({docType: 'excel', documentName: documentName})
      }
    })
    // // You can then return this straight 
    // res.attachment('ComparableAssestment-' + req.query.pin + '.xlsx') // This is sails.js specific (in general you need to set headers) 
    // return res.send(report)
  })
}

function downloadDoc (req, res) {
  if (req.query.documentName) {
    var documentPath = './server/documents/generated/' + req.query.documentName
    // var fileName = "report.pdf"; // The default name the browser will use
    console.log(documentPath)
    res.download(documentPath, req.query.documentName, function (err) {
      if (err) {
        console.log(err)
      } else {
        console.log('downloaded')
      }
    })
  } else {
    res.json({message: 'No document present', status: 404})
  }
}

module.exports = {
  createCase,
  downloadDoc,
  generateDoc,
  generateExcelFromComparables
}
