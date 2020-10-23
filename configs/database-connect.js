const _ = require('./config').db

module.exports = require('knex')({
    client: _.client,
    version: '13.0',
    connection: {
        host: _.host,
        user: _.user,
        password: _.password,
        database: _.database
    }
})