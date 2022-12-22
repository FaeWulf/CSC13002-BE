const express = require('express')
const router = express.Router()

const hocsinh = require('../controllers/hocsinh')

router.get("/hocsinh", async (req, res) => {
  const temp = await hocsinh.all()
  res.json(temp)
})

module.exports = router
