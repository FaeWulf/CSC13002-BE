const express = require('express')
const router = express.Router()

const lop = require('../controllers/lop')

router.get("/lop/search", async (req, res) => {
  let data = null
  if (req.query.id)
    data = await lop.byId(String(req.query.id))

  if (req.query.name)
    data = await lop.byName(String(req.query.name))

  let back = {}
  back.status = "ok"
  back.data = data

  if (!data)
    back.status = "notfound"

  return res.json(back)
})

router.get("/lop/create", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MALOP, TENLOP, SISO, MAKHOI } = JSON.parse(req.query.data)
      data = await lop.add(MALOP, TENLOP, SISO, MAKHOI)
    }

    back.data = data

    if (!data)
      back.status = "create failed"
  }
  catch (err) {
    back.status = err
    console.log("[lop] create try failed \n", err)
  }

  return res.json(back)
})

router.get("/lop/update", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MALOP, TENLOP, SISO, MAKHOI } = JSON.parse(req.query.data)
      data = await lop.updateById(MALOP, TENLOP, SISO, MAKHOI)
    }

    back.data = data

    if (!data)
      back.status = "update failed"
  }
  catch (err) {
    back.status = err
    console.log("[lop] update try failed \n", err)
  }

  return res.json(back)
})

router.get("/lop/delete", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.id) {
      data = await lop.deleteById(req.query.id)
    }

    back.data = data

    if (!data)
      back.status = "delete failed"
  }
  catch (err) {
    back.status = err
    console.log("[lop] delete try failed \n", err)
  }

  return res.json(back)
})

router.get("/lop/all", async (req, res) => {
  const temp = await lop.all()
  res.json({
    status: "ok",
    data: temp
  })
})

module.exports = router
