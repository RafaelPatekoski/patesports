const express = require("express")
const router = express.Router()
const articleController = require("../controllers/articleController")

router.get("/", articleController.lastFourArticles, (req, res)=>{
    let articles = req.articles
    res.render("index", { articles })
})
router.get("/read/:slug", articleController.readArticle)

module.exports = router