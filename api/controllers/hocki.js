const db = require('../db.js')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM hocki')
    return rs
  },

  add: async (MAHK, TENHK) => {
    const rs = await db.one('INSERT INTO hocki(MAHK, TENHK) VALUES($1, $2) RETURNING *',
      [MAHK, TENHK]
    )
    return rs
  },

  byName: async (TENHK) => {
    const rs = await db.oneOrNone('SELECT * FROM hocki WHERE TENHK=$1',
      [TENHK]
    )
    return rs
  },

  byId: async (MAHK) => {
    const rs = await db.oneOrNone('SELECT * FROM hocki WHERE MAHK=$1',
      [MAHK]
    )
    return rs
  },

  updateById: async (MAHK, TENHK) => {
    const rs = await db.query('UPDATE hocki SET TENHK=$1 WHERE MAHK=$2',
      [TENHK, MAHK]
    )
    return rs
  },

  deleteById: async MAHK => {
    const rs = await db.query('DELETE FROM hocki WHERE MAHK=$1',
      [MAHK]
    )
    return rs
  }
}
