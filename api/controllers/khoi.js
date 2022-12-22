const db = require('../db.js')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM khoi')
    return rs
  },

  add: async (MAKHOI, TENKHOI, SOLUONG) => {
    const rs = await db.one('INSERT INTO khoi(MAKHOI, TENKHOI, SOLUONG) VALUES($1, $2, $3) RETURNING *',
      [MAKHOI, TENKHOI, SOLUONG]
    )
    return rs
  },

  byId: async (MAKHOI) => {
    const rs = await db.oneOrNone('SELECT * FROM khoi WHERE MAKHOI=$1',
      [MAKHOI]
    )
    return rs
  },

  updateById: async (MAKHOI, TENKHOI, SOLUONG) => {
    const rs = await db.query('UPDATE khoi SET TENKHOI=$1, SOLUONG=$2 WHERE MAKHOI=$3',
      [TENKHOI, SOLUONG, MAKHOI]
    )
    return rs
  },

  deleteById: async MAKHOI => {
    const rs = await db.query('DELETE FROM khoi WHERE MAKHOI=$1',
      [MAKHOI]
    )
    return rs
  }
}
