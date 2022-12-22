const express = require('express')
const router = express.Router()

const hocsinh = require('../controllers/hocsinh')

router.get("/hocsinh/search", async (req, res) => {
  let data = null
  if (req.query.id)
    data = await hocsinh.byId(String(req.query.id))

  if (req.query.name)
    data = await hocsinh.byName(String(req.query.name))

  let back = {}
  back.status = "ok"
  back.data = data

  if (!data)
    back.status = "notfound"

  return res.json(back)

})

router.get("/hocsinh/create", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MAHS, HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP } = JSON.parse(req.query.data)
      data = await hocsinh.add(MAHS, HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP)
    }

    back.data = data

    if (!data)
      back.status = "create failed"
  }
  catch (err) {
    back.status = err
    console.log("[hocsinh] create try failed \n", err)
  }

  return res.json(back)
})

router.get("/hocsinh/update", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.data) {
      //console.log(req.query.data)
      let { MAHS, HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP } = JSON.parse(req.query.data)
      data = await hocsinh.updateById(MAHS, HOTEN, GIOITINH, NGAYSINH, DIACHI, EMAIL, MALOP)
    }

    back.data = data

    if (!data)
      back.status = "update failed"
  }
  catch (err) {
    back.status = err
    console.log("[hocsinh] update try failed \n", err)
  }

  return res.json(back)
})

router.get("/hocsinh/delete", async (req, res) => {
  let data = null

  let back = {}
  back.status = "ok"
  back.data = data

  try {
    if (req.query.id) {
      data = await hocsinh.deleteById(req.query.id)
    }

    back.data = data

    if (!data)
      back.status = "delete failed"
  }
  catch (err) {
    back.status = err
    console.log("[hocsinh] delete try failed \n", err)
  }

  return res.json(back)
})

router.get("/hocsinh/all", async (req, res) => {
  const temp = await hocsinh.all()
  res.json({
    status: "ok",
    data: temp
  })
})

module.exports = router
