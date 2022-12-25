const initOptions = {}
const pgp = require('pg-promise')(initOptions)

const cn = (
  {
    host: process.env.db_host,
    user: process.env.db_user,
    port: process.env.db_port,
    password: process.env.db_password,
    database: process.env.db_database,
    max: 30
  }
);

module.exports = pgp(cn)
