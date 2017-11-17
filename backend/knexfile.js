// Update with your config settings.

module.exports = {
  // postgres://taxUser:@192.168.1.70:5432/taxAppeal
  development: {
    client: 'postgresql',
    connection: {
      database: 'taxAppeal',
      user: 'taxUser',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'taxAppeal',
      user: 'taxUser',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'taxAppeal',
      user: 'taxUser',
      password: ''
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

}
