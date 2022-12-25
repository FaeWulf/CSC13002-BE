const db = require('../db.js')
const pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});

const { str, int } = require('../../modules/setType')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM hocsinh')
    return rs
  },

  add: async (MAHS, HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP) => {
    const rs = await db.one('INSERT INTO hocsinh(MAHS, HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [String(MAHS), HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP]
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
      [String(MAHS)]
    )
    return rs
  },

  updateById: async (MAHS, HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP) => {

    const csGeneric = new pgp.helpers.ColumnSet([
      str('hoten'), str("gioitinh"), str("ngaysinh"), str("diachi"), str("email"), str("malop")
    ], { table: 'hocsinh' });

    //should care about sql injection"
    const update = pgp.helpers.update({ "hoten": HOTEN, "gioitinh": GIOITINH, 'ngaysinh': NGAYSINH, "diachi": DIACHI, "email": EMAIL, "malop": MALOP }, csGeneric);

    try {
      await db.none(update + ' WHERE MAHS=$1', String(MAHS));
      return { status: "done" }
    } catch (err) {
      console.log("[db hocsinh] ", err)
      return null;
    }
  },

  deleteById: async MAHS => {
    const rs = await db.query('DELETE FROM hocsinh WHERE MAHS=$1',
      [String(MAHS)]
    )
    return rs
  }
}
