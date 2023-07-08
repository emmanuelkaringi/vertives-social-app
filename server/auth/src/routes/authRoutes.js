const  authRoutes = require('express').Router();
const { createUser, loginUser, logoutUser } = require('../controllers/authController')
const newUserMiddleware = require('../middlewares/newUserMiddleware')
const { sessionAuth } = require('../middlewares/sessionMiddleware')

authRoutes.post('/register', newUserMiddleware, createUser)
authRoutes.post('/login', loginUser)
authRoutes.get('/logout', sessionAuth, logoutUser)

module.exports = authRoutes;