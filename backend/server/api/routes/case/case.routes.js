let Case = require('./../../models/case')

/**
 * Add two numbers.
 * @param {object} req The first number.
 * @param {object} res The second number.
 */
function createCase (req, res) {
  let cases =
  {
    // user_id: '',
    property_id: req.query.propertyId,
    firstName: '',
    lastName: '',
    address: '',
    email: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
    // document_id: '',
    // analyst_id: '',
    status: 'In progress'}
  Case.forge(cases)
    .save()
    .then((cases) => {
      res.status(200).json(cases)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({error: true, data: {error: err, message: err.message}})
    })
}
function getCase (req, res) {
  Case.byId(req.query.caseId).then((cases) => {
    res.status(200).json(cases)
  })
}

function allCases (req, res) {
  Case.all().then((cases) => {
    res.status(200).json(cases)
  })
}

function updatePetitioner (req, res) {
  Case.forge({id: req.query.propertyId})
    .save({
      firstName: req.query.firstName,
      lastName: req.query.lastName,
      address: req.query.address,
      email: req.query.email,
      city: req.query.city,
      state: req.query.state,
      zip: req.query.zip,
      phone: req.query.phone
    })
    .then((cases) => {
      res.status(200).json(cases)
    })
    .catch((err) => {
      console.log(err)
      // res.status(500).json({error: true, data: {error: err, message: err.message}});
    })
}

module.exports = {
  createCase,
  getCase,
  updatePetitioner,
  allCases
}
