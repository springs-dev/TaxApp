let bookshelf = require('./../../postgres')
// require('./case')
class Property extends bookshelf.model.Model {
  get tableName () {
    return 'property'
  }

  // get case () {
  //   return this.belongsTo('Case', 'property_id')
  // }

  static byPin (pin) {
    return this.forge().query({where: { 'pin': pin }}).fetchAll()
  }
  static byId (id) {
    return this.forge().query({where: { 'id': id }}).fetch()
  }

  static byCity (city) {
    return this.forge().query({where: { 'city': city.toUpperCase() }}).fetchAll()
  }

  static byStreetNumber (streetNumber) {
    return this.forge().query({where: { 'houseno': streetNumber }}).fetchAll()
  }

  static byStreetNameCity (streetName, city) {
    return this.forge().query({where: { 'street': streetName.toUpperCase(), 'city': city.toUpperCase() }}).fetchAll()
  }

  static byStreetName (streetName, city) {
    return this.forge().query({where: { 'street': streetName.toUpperCase() }}).fetchAll()
  }

  static byStreetNumberCity (streetNumber, city) {
    return this.forge().query({where: { 'houseno': streetNumber, 'city': city.toUpperCase() }}).fetchAll()
  }

  static byStreetNameStreetNumber (streetName, streetNumber) {
    return this.forge().query({where: {'street': streetName.toUpperCase(), 'houseno': streetNumber}}).fetchAll()
  }

  static byFullAddress (streetName, streetNumber, city) {
    return this.forge().query({where: {'street': streetName.toUpperCase(), 'houseno': streetNumber, 'city': city.toUpperCase()}}).fetchAll()
  }
}

module.exports = Property
