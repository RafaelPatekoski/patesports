const Sequelize = require("sequelize")
const connection = require("../database/database")
const User = require("./User")
const Article = require("./Article")

const Comment = connection.define("comments", {
    body: {type: Sequelize.STRING, allowNull: false},
})
User.hasMany(Comment)
Article.hasMany(Comment)
Comment.belongsTo(Article)
Comment.belongsTo(User)

Comment.sync({force: true})

module.exports = Comment