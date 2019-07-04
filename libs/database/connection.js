const knex = require("knex");

const connection = knex({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "30112013",
    database: "webchat_dev"
  },
  pool: { min: 0, max: 7 }
});

module.exports = connection;
