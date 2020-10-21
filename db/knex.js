const _ = require('../configs/constrant')
var options = {
  development: {
    client: _.PG_CLIENT,
    connection: {
      host: DB_HOST,
      user: _.PG_HOST,
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
  }
}

const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment];
module.exports = require('koa-knex')(config);