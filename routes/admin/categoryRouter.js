const express = require("express")
const router = express.Router()
const catetoryController = require("../../controllers/categoryController")

router.get("/",(req, res)=>{
    res.send("category")
})
router.get("/new", catetoryController.getNewCategory)
router.post("/new", catetoryController.postNewCategory)

module.exports = router