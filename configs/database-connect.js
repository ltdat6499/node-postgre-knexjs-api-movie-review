const _ = require('./constrant')

module.exports = require('knex')({
    client: _.PG_CLIENT,
    version: '13.0',
    connection: {
        host: _.PG_HOST,
        user: _.PG_USER,
        password: _.PG_PASSWORD,
        database: _.PG_DB
    }
})