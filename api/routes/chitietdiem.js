const express = require('express')
const router = express.Router()

const chitietdiem = require('../controllers/chitietdiem')

router.get("/chitietdiem/search", async (req, res) => {
  let data = null
  if (req.query.id)
    data = await chitietdiem.byId(String(req.query.id))

  if (req.query.name)
    data = await chitietdiem.byName(String(req.query.name))

  let back = {}
  back.status = "ok"
  back.data = data

  if (!data)
    back.status = "notfound"

  return res.json(back)
})

router.get("/chitietdiem/create", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MADIEMKT, MAKT, DIEMKT } = JSON.parse(req.query.data)
      data = await chitietdiem.add(MADIEMKT, MAKT, DIEMKT)
    }

    back.data = data

    if (!data)
      back.status = "create failed"
  }
  catch (err) {
    back.status = err
    console.log("[chitietdiem] create try failed \n", err)
  }

  return res.json(back)
})

router.get("/chitietdiem/update", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MADIEMKT, MAKT, DIEMKT } = JSON.parse(req.query.data)
      data = await chitietdiem.updateById(MADIEMKT, MAKT, DIEMKT)
    }

    back.data = data

    if (!data)
      back.status = "update failed"
  }
  catch (err) {
    back.status = err
    console.log("[chitietdiem] update try failed \n", err)
  }

  return res.json(back)
})

router.get("/chitietdiem/delete", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.id) {
      data = await chitietdiem.deleteById(req.query.id)
    }

    back.data = data

    if (!data)
      back.status = "delete failed"
  }
  catch (err) {
    back.status = err
    console.log("[chitietdiem] delete try failed \n", err)
  }

  return res.json(back)
})

router.get("/chitietdiem/all", async (req, res) => {
  const temp = await chitietdiem.all()
  res.json({
    status: "ok",
    data: temp
  })
})

module.exports = router
