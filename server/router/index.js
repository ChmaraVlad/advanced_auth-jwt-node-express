const Router = require('express').Router

const { body } = require('express-validator')
// controllers
const userController = require('../controllers/userController')
// middleware
const authMiddleware = require('../middlewares/authMiddleware')

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
router.post("/logout", userController.logout);
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

router.get('/users', authMiddleware, userController.users)

module.exports = router