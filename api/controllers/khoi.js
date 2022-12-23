const db = require('../db.js')

const pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});

const { str, int } = require('../../modules/setType')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM khoi')
    return rs
  },

  add: async (MAKHOI, TENKHOI, SOLUONG) => {
    const rs = await db.one('INSERT INTO khoi(MAKHOI, TENKHOI, SOLUONG) VALUES($1, $2, $3) RETURNING *',
      [String(MAKHOI), TENKHOI, SOLUONG]
    )
    return rs
  },

  byId: async (MAKHOI) => {
    const rs = await db.oneOrNone('SELECT * FROM khoi WHERE MAKHOI=$1',
      [String(MAKHOI)]
    )
    return rs
  },

  updateById: async (MAKHOI, TENKHOI, SOLUONG) => {
    const csGeneric = new pgp.helpers.ColumnSet([
      str('tenkhoi'), int("soluong")
    ], { table: 'khoi' });

    //should care about sql injection"
    const update = pgp.helpers.update({ "tenkhoi": TENKHOI, "soluong": SOLUONG }, csGeneric);

    try {
      await db.none(update + ' WHERE MAKHOI=$1', String(MAKHOI));
      return { status: "done" }
    } catch (err) {
      console.log("[db khoi] ", err)
      return null;
    }
  },

  deleteById: async MAKHOI => {
    const rs = await db.query('DELETE FROM khoi WHERE MAKHOI=$1',
      [String(MAKHOI)]
    )
    return rs
  }
}
