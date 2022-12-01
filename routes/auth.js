// Modules
const express = require('express')
const authCtrl = require('../controllers/auth')

// Router
let router = express.Router()

// Middleware de test
router.use((req, res, next) => {
    const event = new Date()
    console.log('AUTH TIME:', event.toString())
    next()
})

// Routage auth
router.post('/login', authCtrl.login)

module.exports = router