const express = require('express')
const router = express.Router()

const query = require('../controllers/diemlop')

router.get("/diemtheolop/search", async (req, res) => {
  let data = null

  let MAMH = req.query.MAMH
  let MAHK = req.query.MAHK
  let MALOP = req.query.MALOP

  let back = {}
  back.status = "ok"
  back.data = data

  if (!MAMH || !MAHK || !MALOP) {
    back.status = "missing variables (MAMH, MAHK, MALOP)"
    return res.json(back)
  }

  try {
    MALOP = String(MALOP)
    MAHK = String(MAHK)
    MAMH = String(MAMH)
    data = await query.query(MALOP, MAMH, MAHK)
    back.data = data
  }
  catch (err) {
    console.log('[queries] error\n', err)
    back.status = err
  }

  if (!data)
    back.status = "notfound"

  return res.json(back)
})

module.exports = router
