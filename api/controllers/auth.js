const db = require('../db.js')

const pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});

const { str, int } = require('../../modules/setType')



module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM taikhoan')
    return rs
  },

  add: async (MATK, TENDANGNHAP, MATKHAU, LOAITK) => {
    const rs = await db.one('INSERT INTO taikhoan(MATK, TENDANGNHAP, MATKHAU, LOAITK) VALUES($1, $2, $3, $4) RETURNING *',
      [String(MATK), String(TENDANGNHAP), String(MATKHAU), parseInt(LOAITK)]
    )
    return rs
  },

  byName: async (TENDANGNHAP) => {
    const rs = await db.oneOrNone('SELECT * FROM taikhoan WHERE TENDANGNHAP=$1',
      [String(TENDANGNHAP)]
    )
    return rs
  },

  byId: async (MATK) => {
    const rs = await db.oneOrNone('SELECT * FROM taikhoan WHERE MATK=$1',
      [String(MATK)]
    )
    return rs
  },

  updateById: async (MATK, TENDANGNHAP, MATKHAU, LOAITK) => {

    const csGeneric = new pgp.helpers.ColumnSet([
      str('tendangnhap'), str("matkhau"), int('loaitk')
    ], { table: 'taikhoan' });

    //should care about sql injection"
    const update = pgp.helpers.update({ "tendangnhap": TENDANGNHAP, "matkhau": MATKHAU, "loaitk": LOAITK }, csGeneric);

    try {
      await db.none(update + ' WHERE MATK=$1', String(MATK));
      return { status: "done" }
    } catch (err) {
      console.log("[db auth] ", err)
      return null;
    }
  },

  deleteById: async MATK => {
    const rs = await db.query('DELETE FROM taikhoan WHERE MATK=$1',
      [String(MATK)]
    )
    return rs
  }
}
