const express = require('express')
const router = express.Router()

const lop = require('../controllers/lop')

router.get("/auth", async (req, res) => {
  const temp = await lop.all()
  res.json(temp)
})

module.exports = router
