const db = require('../db.js')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM diemtk')
    return rs
  },

  add: async (MADIEMTK, DIEMTK, MAHK, MAMH, MAHS) => {
    const rs = await db.one('INSERT INTO diemtk(MADIEMTK, DIEMTK, MAHK, MAMH, MAHS) VALUES($1, $2, $3, $4, $5) RETURNING *',
      [MADIEMTK, DIEMTK, MAHK, MAMH, MAHS]
    )
    return rs
  },

  byId: async (MADIEMTK) => {
    const rs = await db.oneOrNone('SELECT * FROM diemtk WHERE MADIEMKT=$1',
      [MADIEMTK]
    )
    return rs
  },

  updateById: async (MADIEMTK, DIEMTK, MAHK, MAMH, MAHS) => {
    const rs = await db.query('UPDATE diemtk SET DIEMTK=$1, MAHK=$2, MAMH=$3, MAHS=$4 WHERE MADIEMTK=$5',
      [DIEMTK, MAHK, MAMH, MAHS, MADIEMTK]
    )
    return rs
  },

  deleteById: async MADIEMTK => {
    const rs = await db.query('DELETE FROM diemtk WHERE MADIEMTK=$1',
      [MADIEMTK]
    )
    return rs
  }
}
