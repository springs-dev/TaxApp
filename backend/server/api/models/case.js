// require('./properties')
let bookshelf = require('./../../postgres')

class Case extends bookshelf.model.Model {
  get tableName () {
    return 'case'
  }
  // get property () {
  //   return this.hasOne('Property', 'id')
  // }
  //
  // {withRelated: ['property']})
  static byId (id) {
    return this.forge().query({where: { 'id': id }}).fetch()
  }
  static all () {
    return this.forge().fetchAll()
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

module.exports = Case
