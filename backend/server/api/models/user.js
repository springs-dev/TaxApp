let document = require('./document')
let bookshelf = require('./../../postgres')

class User extends bookshelf.model.Model {
  get tableName () {
    return 'user'
  }

  static byUserNamePassword (username, password) {
    return this.forge().query({where: {'email': username, 'password': password}}).fetch()
  }

  static byToken (token) {
    return this.forge().query({where: { 'token': token }}).fetch()
  }

  static byEmail (email) {
    return this.forge().query({where: {'email': email}}).fetch()
  }

  static document () {
    return this.belongsTo(document)
  }
}

module.exports = User
