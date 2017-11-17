let config = require('config')
let knex = require('knex')({
  client: 'pg',
  connection: config.PostgresHost,
  searchPath: 'knex,public',
  acquireConnectionTimeout: 1000000
})

exports.model = require('bookshelf')(knex)
