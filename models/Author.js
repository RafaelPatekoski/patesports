const Sequelize = require("sequelize")
const connection = require("../database/database")

const Author = connection.define("author", {
    name: {type: Sequelize.STRING, allowNull: false},
    slug: {type: Sequelize.STRING, allowNull: false},
    about: {type: Sequelize.STRING, allowNull: false},
    profile: {type: Sequelize.STRING, allowNull: false},
    login: {type: Sequelize.STRING, allowNull: false},
    password: {type: Sequelize.STRING, allowNull: false}
})
//Author.sync({force: true})

module.exports = Author