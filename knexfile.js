const config = require("./configs/config");

module.exports = {
  development: {
    client: config.db.client,
    connection: {
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
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
