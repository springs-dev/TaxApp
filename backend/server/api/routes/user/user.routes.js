let User = require('./../../models/user')
var uuid = require('node-uuid');
// let SelectedProperty = require('./../../models/selected_properties')
// let Promise = require('bluebird')
// let pdfFiller = require('node-pdffiller')
// let fs = require('fs')

/*
 * GET /property/:pin route to retrieve a user given its unqiueIdentifier.
  */
function loginUser (req, res) {
  User.byUserNamePassword(req.body.username, req.body.password).then(function (users) {
    console.log(users)
    if (users) {
      let user = users.attributes
      let response = {
        logged: true,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.address,
        token: user.token,
        username: user.email,
        role: user.role
      }
      res.status(200)
        .json(response)
    } else {
      let error = {
        logged: false,
        message: 'error login'
      }
      res.status(404)
        .json(error)
    }
  })
}

/*
 * GET /property/:pin route to retrieve a user given its unqiueIdentifier.
  */
function registerUser (req, res) {
  console.log(req.body)
  User.byEmail(req.body.email).then(function (users) {
    console.log(users)
    if (users && req.body.password !== req.body.confirmPassword) {
      let response = {
        error: true,
        message: 'User with this email already exist!'
      }
      res.status(200)
        .json(response)
    } else {
      let user = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        token: uuid.v1(),
        role: 'user'
      }
      User.forge(user).save()
        .then(function (user) {
          let response = {
            logged: true,
            firstName: user.attributes.firstName,
            lastName: user.attributes.lastName,
            email: user.attributes.email,
            token: user.attributes.token,
            role: user.attributes.role
          }
          res.status(200)
            .json(response)
        })
        .catch(function (err) {
          console.log(err)
          // res.status(500).json({error: true, data: {error: err, message: err.message}});
          res.status(404)
            .json({
              error: true,
              message: 'Error while registring user!'
            })
        })
    }
  })
}

module.exports = {
  loginUser,
  registerUser
}
