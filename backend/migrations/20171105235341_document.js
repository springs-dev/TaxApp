
exports.up = (knex, Promise) => {
  return knex.schema.createTable('document', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references('user.id')
    table.string('type').notNull()
    table.string('name').notNull()
    table.string('location').notNull()
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'))
    table.timestamp('modified_at').nullable()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable('document')
}
