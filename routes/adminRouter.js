const express = require("express")
const router = express.Router()
const categoryRouter = require("./admin/categoryRouter")
const articleRouter = require("./admin/articleRouter")

router.use("/category", categoryRouter)
// router.use("/article", articleRouter)
module.exports = router