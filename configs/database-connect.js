const config = require("./config").db;

module.exports = require("knex")({
  client: config.client,
  version: "13.0",
  connection: {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
  },
});
