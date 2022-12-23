const express = require('express')
const router = express.Router()

const loaikt = require('../controllers/loaikt')

router.get("/loaikt/search", async (req, res) => {
  let data = null
  if (req.query.id)
    data = await loaikt.byId(String(req.query.id))

  if (req.query.name)
    data = await loaikt.byName(String(req.query.name))

  let back = {}
  back.status = "ok"
  back.data = data

  if (!data)
    back.status = "notfound"

  return res.json(back)
})

router.get("/loaikt/create", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MAKT, TENKT } = JSON.parse(req.query.data)
      data = await loaikt.add(MAKT, TENKT)
    }

    back.data = data

    if (!data)
      back.status = "create failed"
  }
  catch (err) {
    back.status = err
    console.log("[loaikt] create try failed \n", err)
  }

  return res.json(back)
})

router.get("/loaikt/update", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MAKT, TENKT } = JSON.parse(req.query.data)
      data = await loaikt.updateById(MAKT, TENKT)
    }

    back.data = data

    if (!data)
      back.status = "update failed"
  }
  catch (err) {
    back.status = err
    console.log("[loaikt] update try failed \n", err)
  }

  return res.json(back)
})

router.get("/loaikt/delete", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.id) {
      data = await loaikt.deleteById(req.query.id)
    }

    back.data = data

    if (!data)
      back.status = "delete failed"
  }
  catch (err) {
    back.status = err
    console.log("[loaikt] delete try failed \n", err)
  }

  return res.json(back)
})

router.get("/loaikt/all", async (req, res) => {
  const temp = await loaikt.all()
  res.json({
    status: "ok",
    data: temp
  })
})

module.exports = router
