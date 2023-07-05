const  authRoutes = require('express').Router();
const { createUser, loginUser } = require('../controllers/authController')
const newUserMiddleware = require('../middlewares/newUserMiddleware')

authRoutes.post('/register', newUserMiddleware, createUser)
authRoutes.post('/login', loginUser)

module.exports = authRoutes;