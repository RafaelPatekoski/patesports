const Author = require("../models/Author")
const slugify = require("slugify")
const bcrypt = require("bcryptjs")


module.exports = {
    getNewAuthor: (req,res)=>{
        res.render("author/new")
    },
    postNewAuthor: async (req,res)=>{
        const name = req.body.name
        const slug = slugify(name)
        const about = req.body.about
        // const profile = req.body.profile VOU CRIAR DEPOIS DE RECEBER A RESPOSTA
        const login = req.body.login
        const password = req.body.password
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        let inserir = false
        //
        await Author.findOne({where:{login: login}}).then(author=>{
            if(author == undefined){
                const newAuthor = Author.create({
                                name: name,
                                slug: slug,
                                about: about,
                                login: login,
                                password: hash,
                                profile: req.file.filename
                            }).then(()=>{
                                res.redirect("/author")
                            }).catch(error=>{
                                res.send(error)
                            }) 
            } else{
                res.redirect("/author/new")
            }
        })       
    },
    getLogin: (req,res)=>{
        res.render("author/login")
    },
    postLogin: (req, res)=>{
        let login = req.body.login
        let password = req.body.password
        Author.findOne({where:{login: login}}).then(author=>{
            if(author == undefined){ //se não existir vai renderizar login e mandar erro...
                res.redirect("/author/login")
            } else{ //se tiver dado certo...
                var correct = bcrypt.compareSync(password, author.password)
                if(correct){
                    req.session.author = {
                        id: author.id,
                        login: author.login
                    }
                    res.redirect("/author/profile")
                }else{
                    res.redirect("/author/login")
                }
            }
        })
    },
    authAuthor: (req, res, next)=>{
        let author = req.session.author
        if(author == undefined){
            res.redirect("/author/login")
        }
        Author.findOne({where:{login: author.login}}).then(author=>{
            if(author == undefined){ //se não existir vai renderizar login e mandar erro...
                res.redirect("/author/login")
            } else{ //se tiver dado certo...
                req.author = author
                next()
            }
        })
    },
    getProfile: (req, res)=>{
        res.render("author/profile", {author: req.author})
    }
}