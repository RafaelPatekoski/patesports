const Sequelize = require("sequelize")
const connection = require("../database/database")
const Category = require("./Category")
const Author = require("./Author")

const Article = connection.define("articles", {
    title: {type: Sequelize.STRING, allowNull: false},
    synthesis: {type: Sequelize.STRING, allowNull: false},
    slug: {type: Sequelize.STRING, allowNull: false},
    body: {type: Sequelize.TEXT, allowNull: false},
    photo: {type: Sequelize.STRING, allowNull: false},

})
Category.hasMany(Article)
Author.hasMany(Article)
Article.belongsTo(Category)
Article.belongsTo(Author)
//Article.sync({force: true})

module.exports = Article