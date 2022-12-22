const db = require('../db.js')

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
    const rs = await db.query('UPDATE chitietdiem SET MAKT=$1, DIEMKT=$2 WHERE MADIEMKT=$3',
      [MAKT, DIEMKT, MADIEMKT]
    )
    return rs
  },

  deleteById: async MADIEMKT => {
    const rs = await db.query('DELETE FROM chitietdiem WHERE MADIEMKT=$1',
      [MADIEMKT]
    )
    return rs
  }
}
