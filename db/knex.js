const config = require('../configs/config')
var options = {
  development: {
    client: config.db.client,
    connection: {
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      charset: 'utf8'
    },
    migrations: {
      directory: __dirname + config.server.migration
    },
    seeds: {
      directory: __dirname + config.server.seed
    }
  }
}

const environment = process.env.ENVIRONMENT || 'development'
const config = require('../knexfile.js')[environment];
module.exports = require('koa-knex')(config);