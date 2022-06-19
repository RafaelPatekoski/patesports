const Category = require('../models/Category')
const Author = require("../models/Author")
const slugify = require("slugify")
const Article = require('../models/Article')

module.exports = {
    getNewArticle: (req, res)=>{
        Category.findAll().then(categories=>{
            res.render("article/new",{author: req.author, categories})
        })  
       
    },
    postNewArticle: (req, res)=>{
        let title = req.body.title
        let synthesis = req.body.synthesis
        let photo =  req.file.filename
        let category = req.body.categoryId
        let author = req.body.authorId
        let body = req.body.article
        Article.create({
            title: title,
            body: body,
            synthesis: synthesis,
            slug: slugify(title),
            photo: photo,
            categoryId: category,
            authorId: author
        }).then(()=>{
            res.redirect("/article")
        })
    },
    lastFourArticles: (req,res, next)=>{
        Article.findAll(
            {  
                include: [{model: Category},{model: Author}],
                
                order: [
                [ 'id','DESC']
     ],
     limit: 7
    }).then(articles=>{
            req.articles = articles
            next()
        })
    },
    readArticle: (req, res)=>{
        let slug = req.params.slug
            Article.findOne({
                where: {slug: slug},
                include: [{model: Category},{model: Author}],
            }).then(article=>{
                if(article != undefined){
                    res.render("read",{article})
                }else{res.redirect("/")}
            }).catch(error =>{
                res.redirect("/")
            })    
    }
}