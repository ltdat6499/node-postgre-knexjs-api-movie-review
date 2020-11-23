const config = require("./configs/config");

module.exports = {
    development: {
        client: "pg",
        connection: {
            host: "127.0.0.1",
            user: "docker",
            password: "docker",
            database: "todo",
            charset: "utf8",
        },
        migrations: {
            directory: __dirname + config.server.migration,
        },
        seeds: {
            directory: __dirname + config.server.seed,
        },
    },
    staging: {
        client: "postgresql",
        connection: {
            database: config.db.database,
            user: config.db.user,
            password: config.db.password,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            directory: __dirname + config.server.migration,
        },
        seeds: {
            directory: __dirname + config.server.seed,
        },
    },
    production: {
        client: "postgresql",
        connection: {
            database: config.db.database,
            user: config.db.user,
            password: config.db.password,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
