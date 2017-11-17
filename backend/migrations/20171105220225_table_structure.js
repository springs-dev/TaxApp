
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('user', (table) => {
      table.increments('id').primary()
      table.string('first_name').notNull()
      table.string('last_name').notNull()
      table.string('email').notNull().unique()
      table.string('phone').nullable()
      table.string('address').nullable()
      table.string('password').notNull()
      table.string('token').notNull()
      table.enum('role', ['user', 'admin', 'superAdmin']).notNull()
      table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'))
      table.timestamp('modified_at').nullable()
    })
  ])
}

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema
      .dropTable('user')
  ])
}
