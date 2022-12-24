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
      [String(MADIEMKT), String(MAKT), DIEMKT]
    )
    return rs
  },

  byId: async (MADIEMKT) => {
    const rs = await db.oneOrNone('SELECT * FROM chitietdiem WHERE MADIEMKT=$1',
      [String(MADIEMKT)]
    )
    return rs
  },

  updateById: async (MADIEMKT, MAKT, DIEMKT) => {
    let rs = null
    try {
      rs = await db.query('UPDATE chitietdiem SET DIEMKT=$1 WHERE MADIEMKT=$2 AND MAKT=$3',
        [DIEMKT, String(MADIEMKT), String(MAKT)]
      )
    } catch (err) {
      console.log("[db chitietdiem] ", err)
      return null;
    }
    return rs
  },

  deleteById: async MADIEMKT => {
    const rs = await db.query('DELETE FROM chitietdiem WHERE MADIEMKT=$1',
      [String(MADIEMKT)]
    )
    return rs
  }
}
