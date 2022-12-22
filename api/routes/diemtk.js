const express = require('express')
const router = express.Router()

const diemtk = require('../controllers/diemtk')

router.get("/diemtk/search", async (req, res) => {
  let data = null
  if (req.query.id)
    data = await diemtk.byId(String(req.query.id))

  if (req.query.name)
    data = await diemtk.byName(String(req.query.name))

  let back = {}
  back.status = "ok"
  back.data = data

  if (!data)
    back.status = "notfound"

  return res.json(back)
})

router.get("/diemtk/create", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MADIEMTK, DIEMTK, MAHK, MAMH, MAHS } = JSON.parse(req.query.data)
      data = await diemtk.add(MADIEMTK, DIEMTK, MAHK, MAMH, MAHS)
    }

    back.data = data

    if (!data)
      back.status = "create failed"
  }
  catch (err) {
    back.status = err
    console.log("[diemtk] create try failed \n", err)
  }

  return res.json(back)
})

router.get("/diemtk/update", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MADIEMTK, DIEMTK, MAHK, MAMH, MAHS } = JSON.parse(req.query.data)
      data = await diemtk.updateById(MADIEMTK, DIEMTK, MAHK, MAMH, MAHS)
    }

    back.data = data

    if (!data)
      back.status = "update failed"
  }
  catch (err) {
    back.status = err
    console.log("[diemtk] update try failed \n", err)
  }

  return res.json(back)
})

router.get("/diemtk/delete", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.id) {
      data = await diemtk.deleteById(req.query.id)
    }

    back.data = data

    if (!data)
      back.status = "delete failed"
  }
  catch (err) {
    back.status = err
    console.log("[diemtk] delete try failed \n", err)
  }

  return res.json(back)
})

router.get("/diemtk/all", async (req, res) => {
  const temp = await diemtk.all()
  res.json({
    status: "ok",
    data: temp
  })
})

module.exports = router
