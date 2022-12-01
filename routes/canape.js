// Modules
const express = require('express')
const canapeCtrl = require('../controllers/canape')
const checkTokenMiddleware = require('../middleware/checkJWT')

// Router
let router = express.Router()

// Middleware de test
router.use((req, res, next) => {
    const event = new Date()
    console.log('CANAPE TIME:', event.toString())
    next()
})

router.get('/', checkTokenMiddleware, canapeCtrl.getAllCanape)
router.get('/:id', canapeCtrl.getCanape)

router.put('', checkTokenMiddleware, canapeCtrl.addCanape)
router.patch('/:id', checkTokenMiddleware, canapeCtrl.updateCanape)

router.delete('/:id', checkTokenMiddleware, canapeCtrl.deleteCanape)

router.post('/:id', checkTokenMiddleware, canapeCtrl.socialeCanape)

module.exports = router