let Property = require('./../models/properties')
let PropertyDao = require('./../dao/propertyDao')

let Promise = require('bluebird')
const fs = Promise.promisifyAll(require('fs'))
const neatCsv = require('neat-csv')
function storeCSV (req, res) {
  const data = fs.readFileAsync(`/Users/rimzoni/jamax/src/appealMyTaxAPI/server/data/NLTWNH23.csv`, 'utf-8')
  // const data =  fs.readFileAsync(`/Users/rimzoni/jamax/src/appealMyTaxAPI/server/data/NewTrier.csv`, 'utf-8');
  data.then((data) => {
    try {
      const options = {
        columns: true,
        delimiter: ',',
        quote: '"',
        auto_parse_date: true
      }
      const records = neatCsv(data, options)
      records.then((results) => {
        results.forEach(propertyRaw => {
          // console.log(property)
          propertyRaw.TOWNSHIP = 'New Trier'
          // propertyRaw.TOWNSHIP = 'Maine'
          propertyRaw.BLDPSFV = propertyRaw.CURRENT_BUILDING / propertyRaw.BUILDING_SQ_FT
          propertyRaw.LANDPSV = propertyRaw.CURRENT_LAND / propertyRaw.LAND_SQ_FT
          propertyRaw.PROPERTY_IMAGE = 'http://www.cookcountyassessor.com/PropertyImage.aspx?pin=' + propertyRaw.PIN
          let property = PropertyDao.transformProperty(propertyRaw)
          Property.forge(property)
            .save()
            .then(function (property) {
              console.log(property)
            })
            .catch(function (err) {
              console.log(err)
            // res.status(500).json({error: true, data: {error: err, message: err.message}});
            })
        })
        res.json({message: 'Successfully imported!'})
      })
      // console.log(records)
    } finally {
      // res.json({data: records})
    }
    // console.log(`Mediamath, Parse data successfull for ${context.dbReportId}`);
    // const mediamathParsedRecords = records.map((record) => new MediamathReportRecord(record));
  })
}

module.exports = {
  storeCSV
}
