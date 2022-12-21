const initOptions = {}
const pgp = require('pg-promise')(initOptions)

const cn = (
  {
    host: process.env.DB_HOST || 'db.faewulf.xyz',
    user: process.env.DB_USER || 'postgres',
    port: process.env.DB_PORT || 2204,
    password: 'youshallnotpass',
    database: 'postgres',
    max: 30
  }
);

module.exports = pgp(cn)
