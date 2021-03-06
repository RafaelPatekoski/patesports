const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController")

router.get("/registration", userController.getRegistration)
router.post("/registration", userController.postRegistration)

router.get("/login", userController.getLogin)
router.post("/login", userController.postLogin)

module.exports = router