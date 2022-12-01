// Modules
const express = require('express')
const userCtrl = require('../controllers/user')

// Router
let router = express.Router()

// Middleware de test
router.use((req, res, next) => {
    const event = new Date()
    console.log('USER TIME:', event.toString())
    next()
})

router.get('/', userCtrl.getAllUsers)
router.get('/:id', userCtrl.getUser)

router.put('', userCtrl.addUser)

router.delete('/:id', userCtrl.deleteUser)

module.exports = router