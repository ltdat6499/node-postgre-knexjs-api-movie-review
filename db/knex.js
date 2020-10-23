const _ = require('../configs/config')
var options = {
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
  }
}

const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment];
module.exports = require('koa-knex')(config);