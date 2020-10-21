const _ = require('./configs/constrant')

module.exports = {
  development: {
    client: _.PG_CLIENT,
    connection: {
      host: _.PG_HOST,
      user: _.PG_USER,
      password: _.PG_PASSWORD,
      database: _.PG_DB,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + _.MIGRATIONS
    },
    seeds: {
      directory: __dirname + _.SEED
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: _.PG_DB,
      user: _.PG_USER,
      password: _.PG_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + _.MIGRATIONS
    },
    seeds: {
      directory: __dirname + _.SEED
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: _.PG_DB,
      user: _.PG_USER,
      password: _.PG_PASSWORD
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
