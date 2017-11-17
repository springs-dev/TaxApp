
exports.up = (knex, Promise) => {
  return knex.schema.createTable('case', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references('user.id').nullable()
    table.integer('property_id').references('property.id').nullable()
    table.integer('analyst_id').references('analyst.id').nullable()
    table.integer('document_id').references('document.id').nullable()
    table.string('status').nullable()
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'))
    table.timestamp('modified_at').nullable()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable('case')
}
