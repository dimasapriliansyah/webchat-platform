require('dotenv').config();
const knex = require("knex");

const connection = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  },
  pool: { min: 0, max: 7 }
});

module.exports = connection;
