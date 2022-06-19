const express = require("express")
const app = express()
// ==============  PADRÃO BLOG  ====================
const connection = require("./database/database")
const bodyParser = require("body-parser")
const session = require("express-session")
const router = require("./routes/router")

app.use(session({
    secret: "patesportssessiontaligado",
    cookie: { maxAge: 300000 },
    resave: true,
    saveUninitialized: true
}))
app.set("view engine", "ejs")

//STARTIC
app.use(express.static("public"))
//Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Database 
connection.authenticate().then(()=>{
    console.log("Conexão feita com sucesso")
}).catch((error)=>{
    console.log(error)
})
// ==============  PADRÃO  ====================

app.set('view engine','ejs')

app.use("/",router)

app.listen(3000,()=>{
    console.log("Servidor rodando...")
})