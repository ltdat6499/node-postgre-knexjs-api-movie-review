const _ = require('./configs/config')

module.exports = {
  development: {
    client: _.db.client,
    connection: {
      host: _.db.host,
      user: _.db.user,
      password: _.db.password,
      database: _.db.database,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + _.server.migration
    },
    seeds: {
      directory: __dirname + _.server.seed
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: _.db.database,
      user: _.db.user,
      password: _.db.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + _.server.migration
    },
    seeds: {
      directory: __dirname + _.server.seed
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: _.db.database,
      user: _.db.user,
      password: _.db.password
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
