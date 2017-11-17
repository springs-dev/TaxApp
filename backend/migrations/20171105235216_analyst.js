
exports.up = (knex, Promise) => {
  return knex.schema.createTable('analyst', (table) => {
    table.increments('id').primary()
    table.string('first_name').notNull()
    table.string('last_name').notNull()
    table.string('email').notNull()
    table.string('phone').nullable()
    table.string('address').nullable()
    table.string('realtor').notNull()
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'))
    table.timestamp('modified_at').nullable()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable('analyst')
}
