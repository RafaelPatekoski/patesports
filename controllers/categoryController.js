const Category = require('../models/Category')
const slugify = require("slugify")

module.exports = {
    getNewCategory: (req, res)=>{
        res.render("category/new")
    },
    postNewCategory: (req, res)=>{
        let title = req.body.title
        let about = req.body.about
        Category.create({
            title: title,
            about: about,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/admin/category")
        })
    }
}