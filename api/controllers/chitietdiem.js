const db = require('../db.js')

const pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});
const { str, int } = require('../../modules/setType')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM chitietdiem')
    return rs
  },

  add: async (MADIEMKT, MAKT, DIEMKT) => {
    const rs = await db.one('INSERT INTO chitietdiem(MADIEMKT, MAKT, DIEMKT) VALUES($1, $2, $3) RETURNING *',
      [MADIEMKT, MAKT, DIEMKT]
    )
    return rs
  },

  byId: async (MADIEMKT) => {
    const rs = await db.oneOrNone('SELECT * FROM chitietdiem WHERE MADIEMKT=$1',
      [MADIEMKT]
    )
    return rs
  },

  updateById: async (MADIEMKT, MAKT, DIEMKT) => {
    const csGeneric = new pgp.helpers.ColumnSet([
      str('makt'), int("diemkt")
    ], { table: 'chitietdiem' });

    //should care about sql injection"
    const update = pgp.helpers.update({ "makt": MAKT, "diemkt": DIEMKT }, csGeneric);

    try {
      await db.none(update + ' WHERE MADIEMKT=$1', String(MADIEMKT));
      return { status: "done" }
    } catch (err) {
      console.log("[db chitietdiem] ", err)
      return null;
    }
  },

  deleteById: async MADIEMKT => {
    const rs = await db.query('DELETE FROM chitietdiem WHERE MADIEMKT=$1',
      [String(MADIEMKT)]
    )
    return rs
  }
}
