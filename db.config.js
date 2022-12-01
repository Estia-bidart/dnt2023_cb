// Module
const { Sequelize } = require('sequelize')

// Connexion à la BDD
console.log(process.env.DB_HOST)
let sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: '3306',
        dialect: 'mysql',
        logging: false
    }
)

// Mise en place des relations
const db = {}

db.sequelize = sequelize
db.User = require('./models/user')(sequelize)
db.Canape = require('./models/canape')(sequelize)

db.User.hasMany(db.Canape, { foreignKey: 'user_id'}),
db.Canape.belongsTo(db.User, {foreignKey: 'user_id'})

// Synchronisation
db.sequelize.sync({alter: true})

module.exports = db