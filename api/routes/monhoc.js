const express = require('express')
const router = express.Router()

const monhoc = require('../controllers/monhoc')

router.get("/monhoc/search", async (req, res) => {
  let data = null
  if (req.query.id)
    data = await monhoc.byId(String(req.query.id))

  if (req.query.name)
    data = await monhoc.byName(String(req.query.name))

  let back = {}
  back.status = "ok"
  back.data = data

  if (!data)
    back.status = "notfound"

  return res.json(back)
})

router.get("/monhoc/create", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MAMH, TENMH } = JSON.parse(req.query.data)
      data = await monhoc.add(MAMH, TENMH)
    }

    back.data = data

    if (!data)
      back.status = "create failed"
  }
  catch (err) {
    back.status = err
    console.log("[monhoc] create try failed \n", err)
  }

  return res.json(back)
})

router.get("/monhoc/update", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MAMH, TENMH } = JSON.parse(req.query.data)
      data = await monhoc.updateById(MAMH, TENMH)
    }

    back.data = data

    if (!data)
      back.status = "update failed"
  }
  catch (err) {
    back.status = err
    console.log("[monhoc] update try failed \n", err)
  }

  return res.json(back)
})

router.get("/monhoc/delete", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.id) {
      data = await monhoc.deleteById(req.query.id)
    }

    back.data = data

    if (!data)
      back.status = "delete failed"
  }
  catch (err) {
    back.status = err
    console.log("[monhoc] delete try failed \n", err)
  }

  return res.json(back)
})

router.get("/monhoc/all", async (req, res) => {
  const temp = await monhoc.all()
  res.json({
    status: "ok",
    data: temp
  })
})

module.exports = router
