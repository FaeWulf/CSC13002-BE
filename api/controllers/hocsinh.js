const db = require('../db.js')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM hocsinh')
    return rs
  },

  add: async (MAHS, HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP) => {
    const rs = await db.one('INSERT INTO hocsinh(MAHS, HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [MAHS, HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP]
    )
    return rs
  },

  byName: async (HOTEN) => {
    const rs = await db.oneOrNone('SELECT * FROM hocsinh WHERE HOTEN=$1',
      [HOTEN]
    )
    return rs
  },

  byId: async (MAHS) => {
    const rs = await db.oneOrNone('SELECT * FROM hocsinh WHERE MAHS=$1',
      [MAHS]
    )
    return rs
  },

  updateById: async (MAHS, HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP) => {
    const rs = await db.query('UPDATE hocsinh SET HOTEN=$1, GIOITINH=$2, NGAYSINH=$3, DIACHI=$4, EMAIL=$5, MALOP=$6 WHERE MAHS=$7',
      [HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP, MAHS]
    )
    return rs
  },

  deleteById: async MAHS => {
    const rs = await db.query('DELETE FROM hocsinh WHERE MAHS=$1',
      [MAHS]
    )
    return rs
  }
}
