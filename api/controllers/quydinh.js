const db = require('../db.js')
const pgp = require('pg-promise')({
  capSQL: true // capitalize all generated SQL
});

const { str, int } = require('../../modules/setType')

module.exports = {
  all: async () => {
    const rs = await db.any('SELECT * FROM quydinh')
    return rs
  },

  add: async (MAQUYDINH, TENQUYDINH, VALUE) => {
    try {
      const rs = await db.one('INSERT INTO quydinh(MAQUYDINH, TENQUYDINH, VALUE) VALUES($1, $2, $3) RETURNING *',
        [MAQUYDINH, TENQUYDINH, VALUE]
      )
      return rs
    }
    catch (err) {
      console.log('[quydinh] Error\n', err)
      return err
    }

  },

  byId: async (MAQUYDINH) => {
    const rs = await db.oneOrNone('SELECT * FROM quydinh WHERE MAQUYDINH=$1',
      [String(MAQUYDINH)]
    )
    return rs
  },

  updateById: async (MAQUYDINH, TENQUYDINH, VALUE) => {
    const csGeneric = new pgp.helpers.ColumnSet([
      str('tenquydinh'), int("value")
    ], { table: 'quydinh' });

    //should care about sql injection"
    const update = pgp.helpers.update({ "tenquydinh": TENQUYDINH, "value": VALUE }, csGeneric);

    try {
      await db.none(update + ' WHERE MAQUYDINH=$1', String(MAQUYDINH));
      return { status: "done" }
    } catch (err) {
      console.log("[db quydinh] ", err)
      return null;
    }
  },

  deleteById: async MAQUYDINH => {
    try {
      const rs = await db.query('DELETE FROM quydinh WHERE MAQUYDINH=$1',
        [String(MAQUYDINH)]
      )
      return rs
    }
    catch (err) {
      console.log('[quydinh] Error\n', err)
      return err
    }
  }
}
