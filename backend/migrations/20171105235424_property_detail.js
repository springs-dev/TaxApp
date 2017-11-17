
exports.up = (knex, Promise) => {
  return knex.schema.createTable('property_detail', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references('user.id')
    table.integer('property_id').references('property.id')
    table.integer('document_id').references('document.id')
    table.boolean('five_years_purchase').defaultsTo(false)
    table.decimal('purchase_price')
    table.dateTime('purchase_date')
    table.string('distressed_sale')
    table.string('most_recent_refinance')
    table.string('refinance_appraised_value')
    table.string('interest_rate_term')
    table.string('vacancy_three_months')
    table.string('property_thorn_down')
  })
}

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable('property_detail')
}
