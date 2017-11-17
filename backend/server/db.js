var mongoose = require('mongoose')
let config = require('config')

let options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
}

// User native ES6 promise
mongoose.Promise = global.Promise

// db connection
mongoose.connect(config.DBHost, options)
module.exports = mongoose.connection
