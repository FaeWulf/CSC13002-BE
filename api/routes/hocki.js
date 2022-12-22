const express = require('express')
const router = express.Router()

const hocki = require('../controllers/hocki')

router.get("/hocki/search", async (req, res) => {
  let data = null
  if (req.query.id)
    data = await hocki.byId(String(req.query.id))

  if (req.query.name)
    data = await hocki.byName(String(req.query.name))

  let back = {}
  back.status = "ok"
  back.data = data

  if (!data)
    back.status = "notfound"

  return res.json(back)
})

router.get("/hocki/create", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MAHK, TENHK } = JSON.parse(req.query.data)
      data = await hocki.add(MAHK, TENHK)
    }

    back.data = data

    if (!data)
      back.status = "create failed"
  }
  catch (err) {
    back.status = err
    console.log("[hocki] create try failed \n", err)
  }

  return res.json(back)
})

router.get("/hocki/update", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MAHK, TENHK } = JSON.parse(req.query.data)
      data = await hocki.updateById(MAHK, TENHK)
    }

    back.data = data

    if (!data)
      back.status = "update failed"
  }
  catch (err) {
    back.status = err
    console.log("[hocki] update try failed \n", err)
  }

  return res.json(back)
})

router.get("/hocki/delete", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.id) {
      data = await hocki.deleteById(req.query.id)
    }

    back.data = data

    if (!data)
      back.status = "delete failed"
  }
  catch (err) {
    back.status = err
    console.log("[hocki] delete try failed \n", err)
  }

  return res.json(back)
})

router.get("/hocki/all", async (req, res) => {
  const temp = await hocki.all()
  res.json({
    status: "ok",
    data: temp
  })
})

module.exports = router
