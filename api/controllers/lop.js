const db = require('../db.js')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM lop')
    return rs
  },

  add: async (MALOP, TENLOP, SISO, MAKHOI) => {
    const rs = await db.one('INSERT INTO lop(MALOP, TENLOP, SISO, MAKHOI) VALUES($1, $2, $3, $4) RETURNING *',
      [MALOP, TENLOP, SISO, MAKHOI]
    )
    return rs
  },

  byName: async (TENLOP) => {
    const rs = await db.oneOrNone('SELECT * FROM lop WHERE TENLOP=$1',
      [TENLOP]
    )
    return rs
  },

  byId: async (MALOP) => {
    const rs = await db.oneOrNone('SELECT * FROM lop WHERE MALOP=$1',
      [MAHS]
    )
    return rs
  },

  updateById: async (MALOP, TENLOP, SISO, MAKHOI) => {
    const rs = await db.query('UPDATE hocsinh SET MALOP=$1, TENLOP=$2, SISO=$3, MAKHOI=$4 WHERE MAHS=$5',
      [MALOP, TENLOP, SISO, MAKHOI]
    )
    return rs
  },

  deleteById: async MALOP => {
    const rs = await db.query('DELETE FROM lop WHERE MAHS=$1',
      [MALOP]
    )
    return rs
  }
}
