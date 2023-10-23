const Router = require('express').Router

// controllers
const userController = require('../controllers/userController')

const router = Router()

router.post('/registration', userController.registration)
router.post('/login')
router.post('/logout')
router.get('/activate/:link', userController.activate)
router.get('/refresh')

router.get('/users', userController.users)

module.exports = router