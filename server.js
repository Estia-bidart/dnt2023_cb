// Modules
const express = require('express')
const cors = require('cors')
const path = require('path')

// Import de sequelize cnx
const DB = require('./db.config')

// Paramétrage API
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Fichier de routage
const auth_router = require('./routes/auth')
const user_router = require('./routes/user')
const canape_router = require('./routes/canape')

// Routeur principal
app.use('/images', express.static(path.join(__dirname, "images")))

app.get('/', (req, res) => res.send(`I'm online`))

app.use('/auth', auth_router)
app.use('/users', user_router)
app.use('/canapes', canape_router)

app.all('*', (req, res) => res.status(501).send(`bad route`))

// Lancement du serveur
DB.sequelize.authenticate()
    .then(() => console.log('DATABASE OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Server started on port ${process.env.SERVER_PORT}`)
        })
    })
    .catch(err => console.log('Database error', err))


