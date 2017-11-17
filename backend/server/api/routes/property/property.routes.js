let Property = require('./../../models/properties')
let SelectedProperty = require('./../../models/selected_properties')
// let Promise = require('bluebird')
// let fs = require('fs')

/*
 * GET /property/:pin route to retrieve a user given its unqiueIdentifier.
  */
function getByPin (req, res) {
  console.log('PIN REQUEST')
  console.log(req.query)
  if (req.query.pin) {
    Property.byPin(req.query.pin).then(function (properties) {
      res.status(200)
        .json(properties)
    })
  } else if (req.query.streetName && req.query.streetNo && req.query.city) {
    Property.byFullAddress(req.query.streetName, req.query.streetNo, req.query.city).then(function (properties) {
      res.status(200)
        .json(properties)
    })
  } else if (req.query.streetName && req.query.streetNo) {
    Property.byStreetNameStreetNumber(req.query.streetName, req.query.streetNo).then(function (properties) {
      res.status(200)
        .json(properties)
    })
  } else if (req.query.streetName && req.query.city) {
    Property.byStreetNameCity(req.query.streetName, req.query.city).then(function (properties) {
      res.status(200)
        .json(properties)
    })
  } else if (req.query.streetNo && req.query.city) {
    Property.byStreetNumberCity(req.query.streetNo, req.query.city).then(function (properties) {
      res.status(200)
        .json(properties)
    })
  } else if (req.query.streetName) {
    Property.byStreetName(req.query.streetName).then(function (properties) {
      res.status(200)
        .json(properties)
    })
  } else if (req.query.streetNo) {
    Property.byStreetNumber(req.query.streetNo).then(function (properties) {
      res.status(200)
        .json(properties)
    })
  } else {
    Property.byCity(req.query.city).then(function (properties) {
      res.status(200)
        .json(properties)
    })
  }
}

function getById (req, res) {
  Property.byId(req.query.id).then(function (properties) {
    res.status(200)
      .json(properties)
  })
}

/*
 * GET /property/:pin route to retrieve a user given its unqiueIdentifier.
 */
function getByClassDescription (req, res) {
  Property.where({ ovacls: req.query.classCode }).fetchAll().then(function (properties) {
    res.status(200)
      .json(properties)
  })
}

function getTownships (township) {
  let arrayTownship = []
  console.log('township entered')
  if (township.includes(',')) {
    console.log('township has more then 1')
    township = township.split(',')
    for (var i = 0, len = township.length; i < len; i++) {
      arrayTownship.push(township[i])
    }
  } else {
    console.log('just 1 township')
    return township
  }
  console.log('array returned')
  return arrayTownship
}

function getClassCode (classCode) {
  let arrayClassCode = []
  if (classCode.includes(',')) {
    classCode = classCode.split(',')
    for (var i = 0, len = classCode.length; i < len; i++) {
      arrayClassCode.push(classCode[i])
    }
  } else {
    return classCode
  }
  return arrayClassCode
}

function filterData (req, res) {
  console.log(req.query)
  let township = req.query.township
  let classCode = req.query.classCode

  if (township.includes(',')) {
    township = getTownships(township)
    console.log(`Entered multiple township ${township[0]} and ${township[1]}`)
  }

  console.log(` Township ${township}`)
  if (classCode && classCode.length > 1) {
    classCode = getClassCode(classCode)
  }

  console.log(` Township ${township}`)
  console.log(` class code ${classCode}`)

  Property.collection().query(function (qb) {
    qb
      .whereBetween('age', [req.query.minAge, req.query.maxAge])
      .where('township', 'in', township)
      .where('neighborhood', '=', req.query.neighborhood)
      .where('ovacls', 'in', classCode)
      .whereBetween('building_sq_ft', [req.query.squareFootMin, req.query.squareFootMax])
    // .orderBy('bldpsfv', 'desc')
  })
    .orderBy('bldpsfv', 'asc')
    .fetch()
    .then(function (collection) {
      res.status(200)
        .json(collection)
    })
    .catch(function (err) {
      res.status(404)
        .json(err)
    })
}

function filter (req, res) {
  console.log(req.query)
  Property.where({ pin: req.query.pin }).fetch().then(function (properties) {
    console.log(properties.attributes)
    console.log(properties.attributes.AGE)
    Property.collection().query(function (qb) {
      console.log(`Age: ${properties.attributes.AGE},   neighborhood: ${properties.attributes.NEIGHBORHOOD} ,    classCode = ${properties.attributes.OVACLS},  bSQLFt = ${properties.attributes.BUILDING_SQ_FT}`)
      qb
        .whereBetween('age', [properties.attributes.age - 25, properties.attributes.age + 25])
        .where('neighborhood', '=', properties.attributes.neighborhood)
        .where('ovacls', '=', properties.attributes.ovacls)
        .whereBetween('building_sq_ft', [properties.attributes.building_sq_ft - 500, properties.attributes.building_sq_ft + 500])
      // .orderBy('bldpsfv', 'ASC')
    })
      .fetch()
    // .orderBy('bldpsfv', 'ASC').fetch()
      .then(function (collection) {
        res.status(200)
          .json(collection)
      })
  })
}

function addSelectedProperty (req, res) {
  Property.byId(req.query.propertyId).then(function (properties) {
    // console.log(properties.attributes)
    let property = properties.attributes
    property.case_id = req.query.caseId
    delete property['id']
    // console.log(properties.attributes)
    SelectedProperty.forge(property).save()
      .then(function (property) {
        SelectedProperty.byCaseId(req.query.caseId).then(function (properties) {
          res.status(200)
            .json(properties)
        })
      })
      .catch(function (err) {
        console.log(err)
        // res.status(500).json({error: true, data: {error: err, message: err.message}});
      })
  })
}

function removeSelectedProperty (req, res) {
  SelectedProperty.forge({ id: req.query.id }).fetch().then(function (property) {
    if (!property) {
      return res.status(404).json({ error: true, message: 'property not found' })
    }
    // // remove all the associations 
    // property.tags().detach();
    // delete the proeprty
    property.destroy()
    return res.json({ error: false, message: 'property deleted' })
  }).catch(function (err) {
    res.status(500).json({ error: true, data: { message: err.message } })
  })
}

function getSelectedProperty (req, res) {
  SelectedProperty.byCaseId(req.query.caseId).then(function (properties) {
    res.status(200)
      .json(properties)
  })
}
module.exports = {
  getByPin,
  getByClassDescription,
  filter,
  filterData,
  addSelectedProperty,
  getSelectedProperty,
  getById,
  removeSelectedProperty
}
