const express = require('express')
const router = express.Router()

const taikhoan = require('../controllers/auth')

router.get("/taikhoan/search", async (req, res) => {
  let data = null
  if (req.query.id)
    data = await taikhoan.byId(String(req.query.id))

  if (req.query.name)
    data = await taikhoan.byName(String(req.query.name))

  let back = {}
  back.status = "ok"
  back.data = data

  if (!data)
    back.status = "notfound"

  return res.json(back)
})

router.get("/taikhoan/create", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MATK, TENDANGNHAP, MATKHAU, LOAITK } = JSON.parse(req.query.data)
      data = await taikhoan.add(MATK, TENDANGNHAP, MATKHAU, LOAITK)
    }

    back.data = data

    if (!data)
      back.status = "create failed"
  }
  catch (err) {
    back.status = err
    console.log("[taikhoan] create try failed \n", err)
  }

  return res.json(back)
})

router.get("/taikhoan/update", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MATK, TENDANGNHAP, MATKHAU, LOAITK } = JSON.parse(req.query.data)
      data = await taikhoan.updateById(MATK, TENDANGNHAP, MATKHAU, LOAITK)
    }

    back.data = data

    if (!data)
      back.status = "update failed"
  }
  catch (err) {
    back.status = err
    console.log("[taikhoan] update try failed \n", err)
  }

  return res.json(back)
})

router.get("/taikhoan/delete", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.id) {
      data = await taikhoan.deleteById(req.query.id)
    }

    back.data = data

    if (!data)
      back.status = "delete failed"
  }
  catch (err) {
    back.status = err
    console.log("[taikhoan] delete try failed \n", err)
  }

  return res.json(back)
})

router.get("/taikhoan/all", async (req, res) => {
  const temp = await taikhoan.all()
  res.json({
    status: "ok",
    data: temp
  })
})

module.exports = router
