const User = require("../models/User")
const slugify = require("slugify")
const bcrypt = require("bcryptjs")
module.exports = {
    getRegistration: (req,res)=>{
        res.render("user/registration")
    },
    postRegistration: (req,res)=>{
        let name = req.body.name
        let login = req.body.login
        let password = req.body.password
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)

        User.findOne({where:{login: login}}).then(user=>{
            if(user == undefined){
                User.create({
                    name: name,
                    login: login,
                    password: hash,
                    slug: slugify(login)
                }).then(()=>{
                    res.redirect("/user/registradocomsucesso")
                })
            } else{
                res.redirect("/user/registration")
            }
        })  
    },
    getLogin: (req,res)=>{
        res.render("user/login")
    },
    postLogin: (req,res)=>{
        let login = req.body.login
        let password = req.body.password
        console.log("bazinga")
        User.findOne({where:{login: login}}).then(user=>{
            if(user == undefined){ //se não existir vai renderizar login e mandar erro...
                res.redirect("/user/login")
            } else{ //se tiver dado certo...
                var correct = bcrypt.compareSync(password, user.password)
                if(correct){
                    req.session.user = {
                        id: user.id,
                        login: user.login
                    }
                    res.redirect("/usuariologado")
                }else{
                    res.redirect("/user/login")
                }
            }
        })
    }

}