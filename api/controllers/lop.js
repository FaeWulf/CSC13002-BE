const db = require('../db.js')
const pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});

const { str, int } = require('../../modules/setType')

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
      [String(TENLOP)]
    )
    return rs
  },

  byId: async (MALOP) => {
    const rs = await db.oneOrNone('SELECT * FROM lop WHERE MALOP=$1',
      [String(MAHS)]
    )
    return rs
  },

  updateById: async (MALOP, TENLOP, SISO, MAKHOI) => {
    const csGeneric = new pgp.helpers.ColumnSet([
      str('tenlop'), int("siso"), str('makhoi')
    ], { table: 'lop' });

    //should care about sql injection"
    const update = pgp.helpers.update({ "tenlop": TENLOP, "siso": SISO, "makhoi": MAKHOI }, csGeneric);

    try {
      await db.none(update + ' WHERE MALOP=$1', String(MALOP));
      return { status: "done" }
    } catch (err) {
      console.log("[db lop] ", err)
      return null;
    }
  },

  size: async (MALOP) => {
    try {
      const rs = await db.oneOrNone('SELECT COUNT(*) FROM hocsinh WHERE MALOP=$1',
        [String(MALOP)]
      )
      return rs?.count
    } catch (err) {
      console.log("[db lop] ", err)
      return null;
    }

  },

  deleteById: async MALOP => {
    const rs = await db.query('DELETE FROM lop WHERE MAHS=$1',
      [String(MALOP)]
    )
    return rs
  }
}
