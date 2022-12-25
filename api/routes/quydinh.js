const express = require('express')
const router = express.Router()

const quydinh = require('../controllers/quydinh')

router.get("/quydinh/search", async (req, res) => {
  let data = null
  if (req.query.id)
    data = await quydinh.byId(String(req.query.id))

  if (req.query.name)
    data = await quydinh.byName(String(req.query.name))

  let back = {}
  back.status = "ok"
  back.data = data

  if (!data)
    back.status = "notfound"

  return res.json(back)
})

router.get("/quydinh/create", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MAQUYDINH, TENQUYDINH, VALUE } = JSON.parse(req.query.data)
      data = await quydinh.add(MAQUYDINH, TENQUYDINH, VALUE)
    }

    back.data = data

    if (!data)
      back.status = "create failed"
  }
  catch (err) {
    back.status = err
    console.log("[quydinh] create try failed \n", err)
  }

  return res.json(back)
})

router.get("/quydinh/update", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MAQUYDINH, TENQUYDINH, VALUE } = JSON.parse(req.query.data)
      data = await quydinh.updateById(MAQUYDINH, TENQUYDINH, VALUE)
    }

    back.data = data

    if (!data)
      back.status = "update failed"
  }
  catch (err) {
    back.status = err
    console.log("[quydinh] update try failed \n", err)
  }

  return res.json(back)
})

router.get("/quydinh/delete", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.id) {
      data = await quydinh.deleteById(req.query.id)
    }

    back.data = data

    if (!data)
      back.status = "delete failed"
  }
  catch (err) {
    back.status = err
    console.log("[quydinh] delete try failed \n", err)
  }

  return res.json(back)
})

router.get("/quydinh/all", async (req, res) => {
  const temp = await quydinh.all()
  res.json({
    status: "ok",
    data: temp
  })
})

module.exports = router
