const db = require('../db.js')

const pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});
const { str, int } = require('../../modules/setType')

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

    const csGeneric = new pgp.helpers.ColumnSet([
      int('diemtk'), str("mahk"), str('mamh'), str('mahs')
    ], { table: 'diemtk' });

    //should care about sql injection"
    const update = pgp.helpers.update({ "diemtk": DIEMTK, "mahk": MAHK, "mamh": MAMH, "mahs": MAHS }, csGeneric);

    try {
      await db.none(update + ' WHERE MADIEMTK=$1', String(MADIEMTK));
      return { status: "done" }
    } catch (err) {
      console.log("[db diemtk] ", err)
      return null;
    }
  },

  deleteById: async MADIEMTK => {
    const rs = await db.query('DELETE FROM diemtk WHERE MADIEMTK=$1',
      [String(MADIEMTK)]
    )
    return rs
  }
}
