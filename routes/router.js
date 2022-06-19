const express = require("express")
const router = express.Router()
const authorRouter = require("./authorRouter")
const adminRouter = require("./adminRouter")
const articleRouter = require("./articleRouter")
const userRouter = require("./userRouter")
const webRouter = require("./webRouter")


router.use("/author", authorRouter)
router.use("/article", articleRouter)
router.use("/admin", adminRouter)
router.use("/user", userRouter)
router.use("/", webRouter)
module.exports = router