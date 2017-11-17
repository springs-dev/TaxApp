let bookshelf = require('./../../postgres')

class SelectedProperty extends bookshelf.model.Model {
  get tableName () {
    return 'property_selected'
  }

  static byCaseId (caseId) {
    return this.forge().query({where: { 'case_id': caseId }}).fetchAll()
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

module.exports = SelectedProperty
