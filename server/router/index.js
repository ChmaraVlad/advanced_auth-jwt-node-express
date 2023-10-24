const Router = require('express').Router

const { body } = require('express-validator')
// controllers
const userController = require('../controllers/userController')

const router = Router()

router.post('/registration', 
body('email').isEmail(), 
body('password').isLength({min:3, max:32}), 
userController.registration)

router.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.login
);
router.post('/logout')
router.get('/activate/:link', userController.activate)
router.get('/refresh')

router.get('/users', userController.users)

module.exports = router