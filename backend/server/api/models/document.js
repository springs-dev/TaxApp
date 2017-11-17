let bookshelf = require('./../../postgres')

class Document extends bookshelf.model.Model {
  get tableName () {
    return 'document'
  }
  //
  static byId (id) {
    return this.forge().query({where: { 'id': id }}).fetch()
  }
  //
  // static byCity(city) {
  //   return this.forge().query({where:{ 'city': city }}).fetchAll()
  // }
  //
  // static byStreetNumber(streetNumber) {
  //   return this.forge().query({where:{ 'houseno': streetNumber }}).fetchAll()
  // }
  //
  // static byStreetNameCity(streetName,city) {
  //   return this.forge().query({where:{ 'street': streetName }}).fetchAll()
  // }
  //
  // static byStreetNumberCity(streetNumber,city) {
  //   return this.forge().query({where:{ 'houseno': streetNumber, 'city': city }}).fetchAll()
  // }
  //
  // static byStreetNameStreetNumber(streetName, streetNumber){
  //   return this.forge().query({where:{ 'street': streetName , 'houseno' : streetNumber}}).fetchAll()
  // }
  //
  // static byFullAddress(streetName, streetNumber, city){
  //     return this.forge().query({where:{ 'street': streetName , 'houseno' : streetNumber, 'city': city}}).fetchAll()
  // }
}

module.exports = Document
