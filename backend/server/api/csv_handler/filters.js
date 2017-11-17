let bookshelf = require('./../../postgres')

let Filter = bookshelf.model.Model.extend(
  {tableName: 'filters'})

module.exports = Filter
