const db = require('../db.js')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM hocki')
    return rs
  },

  add: async (MAHK, TENHK) => {
    try {
      const rs = await db.one('INSERT INTO hocki(MAHK, TENHK) VALUES($1, $2) RETURNING *',
        [String(MAHK), TENHK]
      )
      return rs
    }
    catch (err) {
      console.log('[hocki] err', err)
      return null
    }
  },

  byName: async (TENHK) => {
    const rs = await db.oneOrNone('SELECT * FROM hocki WHERE TENHK=$1',
      [String(TENHK)]
    )
    return rs
  },

  byId: async (MAHK) => {
    const rs = await db.oneOrNone('SELECT * FROM hocki WHERE MAHK=$1',
      [String(MAHK)]
    )
    return rs
  },

  updateById: async (MAHK, TENHK) => {
    const rs = await db.query('UPDATE hocki SET TENHK=$1 WHERE MAHK=$2',
      [TENHK, String(MAHK)]
    )
    return rs
  },

  deleteById: async MAHK => {
    const rs = await db.query('DELETE FROM hocki WHERE MAHK=$1',
      [String(MAHK)]
    )
    return rs
  }
}
