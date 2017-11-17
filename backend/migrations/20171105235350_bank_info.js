
exports.up = (knex, Promise) => {
  return knex.schema.createTable('bank_info', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references('user.id')
    table.string('card_holder_name').notNull()
    table.string('email').notNull()
    table.string('phone').nullable()
    table.string('billing_address').nullable()
    table.string('credit_card_number').notNull()
    table.string('cvc').notNull()
    table.dateTime('expiration_date').notNull()
    table.boolean('auto_pay').defaultsTo(false)
    table.boolean('email_monthly_billing').defaultsTo(false)
    table.timestamp('created_at').notNull().defaultTo(knex.raw('now()'))
    table.timestamp('modified_at').nullable()
  })
}

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTable('bank_info')
}
