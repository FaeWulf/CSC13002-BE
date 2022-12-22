const express = require('express')
const router = express.Router()

const khoi = require('../controllers/khoi')

router.get("/khoi/search", async (req, res) => {
  let data = null
  if (req.query.id)
    data = await khoi.byId(String(req.query.id))

  if (req.query.name)
    data = await khoi.byName(String(req.query.name))

  let back = {}
  back.status = "ok"
  back.data = data

  if (!data)
    back.status = "notfound"

  return res.json(back)
})

router.get("/khoi/create", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MAKHOI, TENKHOI, SOLUONG } = JSON.parse(req.query.data)
      data = await khoi.add(MAKHOI, TENKHOI, SOLUONG)
    }

    back.data = data

    if (!data)
      back.status = "create failed"
  }
  catch (err) {
    back.status = err
    console.log("[khoi] create try failed \n", err)
  }

  return res.json(back)
})

router.get("/khoi/update", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MAKHOI, TENKHOI, SOLUONG } = JSON.parse(req.query.data)
      data = await khoi.updateById(MAKHOI, TENKHOI, SOLUONG)
    }

    back.data = data

    if (!data)
      back.status = "update failed"
  }
  catch (err) {
    back.status = err
    console.log("[khoi] update try failed \n", err)
  }

  return res.json(back)
})

router.get("/khoi/delete", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.id) {
      data = await khoi.deleteById(req.query.id)
    }

    back.data = data

    if (!data)
      back.status = "delete failed"
  }
  catch (err) {
    back.status = err
    console.log("[khoi] delete try failed \n", err)
  }

  return res.json(back)
})

router.get("/khoi/all", async (req, res) => {
  const temp = await khoi.all()
  res.json({
    status: "ok",
    data: temp
  })
})

module.exports = router
