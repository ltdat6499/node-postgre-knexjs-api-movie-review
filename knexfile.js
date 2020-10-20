// Update with your config settings.
require('dotenv').config()

const {CLIENT, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, DB_HOST, PORT} = process.env

module.exports = {
  development: {
    client: CLIENT,
    connection: {
      host : DB_HOST,
      user : POSTGRES_USER,
      password : POSTGRES_PASSWORD,
      database : POSTGRES_DB,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: POSTGRES_DB,
      user:     POSTGRES_USER,
      password: POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/db/migrations',
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: POSTGRES_DB,
      user:     POSTGRES_USER,
      password: POSTGRES_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
