const db = require('../db.js')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM monhoc')
    return rs
  },

  add: async (MAMH, TENMH) => {
    const rs = await db.one('INSERT INTO monhoc(MAMH, TENMH) VALUES($1, $2) RETURNING *',
      [MAMH, TENMH]
    )
    return rs
  },

  byName: async (TENMH) => {
    const rs = await db.oneOrNone('SELECT * FROM monhoc WHERE TENMH=$1',
      [TENMH]
    )
    return rs
  },

  byId: async (MAMH) => {
    const rs = await db.oneOrNone('SELECT * FROM monhoc WHERE MAMH=$1',
      [MAMH]
    )
    return rs
  },

  updateById: async (MAMH, TENMH) => {
    const rs = await db.query('UPDATE monhoc SET TENMH=$1 WHERE MAMH=$2',
      [TENMH, MAMH]
    )
    return rs
  },

  deleteById: async MAMH => {
    const rs = await db.query('DELETE FROM monhoc WHERE MAMH=$1',
      [MAMH]
    )
    return rs
  }
}
