const express = require('express')
const router = express.Router()

const bangdiem = require('../controllers/bangdiem')

router.get("/bangdiem/search", async (req, res) => {
  let data = null
  if (req.query.id)
    data = await bangdiem.byId(String(req.query.id))

  let back = {}
  back.status = "ok"
  back.data = data

  if (!data)
    back.status = "notfound"

  return res.json(back)
})

router.get("/bangdiem/all", async (req, res) => {
  const temp = await bangdiem.all()
  res.json({
    status: "ok",
    data: temp
  })
})

module.exports = router
