let express = require('express')
let morgan = require('morgan')
let bodyParser = require('body-parser')
let config = require('config')
let port = config.Port
let cors = require('cors')

let tax = require('./api/csv_handler/csv.routes')
let property = require('./api/routes/property/property.routes')
let cases = require('./api/routes/case/case.routes')
let user = require('./api/routes/user/user.routes')
let document = require('./api/routes/document/document.routes')

let app = express()

// Turn on logging
if (config.util.getEnv('NODE_ENV') !== 'test') {
  app.use(morgan('combined'))
}

// parse application/json and look for raw text
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.text())
app.use(bodyParser.json({type: 'application/json'}))
app.use(cors())

// in NodeJS/Express (server)
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Access-Control-Allow-Headers')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT')
  next()
})

app.get('/tax/api', (req, res) => res.json({
  api: 'mytaxappeal',
  service: 'api',
  message: '“The only constant in the technology industry is change.”(Steve Wozniak)'
}))

// Data import in csv format
app.route('/tax/api/import')
  .get(tax.storeCSV)

// Property routes
app.route('/tax/api/property')
  .get(property.getByPin)

app.route('/tax/api/property/id')
  .get(property.getById)

app.route('/tax/api/property/class')
  .get(property.getByClassDescription)

app.route('/tax/api/property/filter')
  .get(property.filter)

app.route('/tax/api/property/filter/custom')
  .get(property.filterData)

// Case routes
app.route('/tax/api/case')
  .get(cases.createCase)
app.route('/tax/api/cases/all')
  .get(cases.allCases)
app.route('/tax/api/cases')
  .get(cases.getCase)
app.route('/tax/api/case/petitioner')
  .get(cases.updatePetitioner)
app.route('/tax/api/case/property')
  .get(property.addSelectedProperty)
app.route('/tax/api/case/property')
  .delete(property.removeSelectedProperty)
app.route('/tax/api/case/property/get')
  .get(property.getSelectedProperty)

// Document routes
app.route('/tax/api/document/generate')
  .get(document.generateDoc)

app.route('/tax/api/document/download')
  .get(document.downloadDoc)
app.route('/tax/api/document/generate/excel')
  .get(document.generateExcelFromComparables)
// User routes  
app.route('/tax/api/user/auth')
  .post(user.loginUser)
app.route('/tax/api/user/register')
  .post(user.registerUser)

app.listen(port)
console.log('Listening on port ' + port)

module.exports = app
