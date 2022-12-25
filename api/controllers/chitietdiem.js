const db = require('../db.js')

const pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});
const { str, int } = require('../../modules/setType')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM chitietdiem')
    return rs
  },

  add: async (MADIEMKT, MAKT, DIEMKT) => {
    try {
      const rs = await db.one('INSERT INTO chitietdiem(MADIEMKT, MAKT, DIEMKT) VALUES($1, $2, $3) RETURNING *',
        [String(MADIEMKT), String(MAKT), DIEMKT]
      )
      return rs
    }
    catch (err) {
      console.log('[chitietdiem] Error\n', err)
      return err
    }
  },

  byId: async (MADIEMKT) => {
    const rs = await db.manyOrNone('SELECT * FROM chitietdiem WHERE MADIEMKT=$1',
      [String(MADIEMKT)]
    )
    return rs
  },

  updateById: async (MADIEMKT, MAKT, DIEMKT) => {
    let rs = null
    try {
      rs = await db.query('UPDATE chitietdiem SET DIEMKT=$1 WHERE MADIEMKT=$2 AND MAKT=$3',
        [DIEMKT, String(MADIEMKT), String(MAKT)]
      )

      //update diemtk when updating chitietdiem
      let diems = await db.manyOrNone(`SELECT * FROM chitietdiem WHERE madiemkt=$1`,
        [String(MADIEMKT)]
      )

      //filter unexpected numbers
      let diem15p = diems[diems.findIndex(E => E.makt == "KT001")]?.diemkt ?? 0
      let diem1tiet = diems[diems.findIndex(E => E.makt == "KT002")]?.diemkt ?? 0
      let diemcuoiky = diems[diems.findIndex(E => E.makt == "KT003")]?.diemkt ?? 0

      diem15p = isNaN(diem15p) ? 0 : diem15p
      diem1tiet = isNaN(diem1tiet) ? 0 : diem1tiet
      diemcuoiky = isNaN(diemcuoiky) ? 0 : diemcuoiky

      //calculate diemtk
      let result = (diem15p + diem1tiet * 2 + diemcuoiky * 3) / 6
      result = Math.round((result + Number.EPSILON) * 100) / 100 //round up to 2 decimal

      //uppdate diemtk
      const rs = await db.query('UPDATE diemtk SET DIEMTK=$1 WHERE MADIEMTK=$2',
        [result, String(MADIEMKT)]
      )

    } catch (err) {
      console.log("[db chitietdiem] ", err)
      return null;
    }
    return rs
  },

  deleteById: async MADIEMKT => {
    const rs = await db.query('DELETE FROM chitietdiem WHERE MADIEMKT=$1',
      [String(MADIEMKT)]
    )
    return rs
  }
}
