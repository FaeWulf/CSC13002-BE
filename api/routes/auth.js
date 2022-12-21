const express = require('express')
const router = express.Router()

router.get("/auth", async (req, res) => {
  res.json({ "lmao": 1 })
})

module.exports = router
