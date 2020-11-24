require("dotenv").config();

module.exports = {
  db: {
    client: "pg",
    user: "docker",
    password: "docker",
    database: "todo",
    host: "127.0.0.1",
    port: 5432,
  },
  server: {
    port: 3000,
    migration: "/db/migrations/",
    seed: "/db/seeds/",
  },
};
