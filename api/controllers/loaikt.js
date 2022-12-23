const db = require('../db.js')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM loaikt')
    return rs
  },

  add: async (MAKT, TENKT) => {
    const rs = await db.one('INSERT INTO loaikt(MAKT, TENKT) VALUES($1, $2) RETURNING *',
      [String(MAKT), TENKT]
    )
    return rs
  },

  byName: async (TENKT) => {
    const rs = await db.oneOrNone('SELECT * FROM loaikt WHERE TENKT=$1',
      [String(TENKT)]
    )
    return rs
  },

  byId: async (MAKT) => {
    const rs = await db.oneOrNone('SELECT * FROM loaikt WHERE MAKT=$1',
      [String(MAKT)]
    )
    return rs
  },

  updateById: async (MAKT, TENKT) => {
    const rs = await db.query('UPDATE loaikt SET TENKT=$1 WHERE MAKT=$2',
      [TENKT, String(MAKT)]
    )
    return rs
  },

  deleteById: async MALOP => {
    const rs = await db.query('DELETE FROM loaikt WHERE MALOP=$1',
      [String(MALOP)]
    )
    return rs
  }
}
