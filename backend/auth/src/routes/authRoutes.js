const  authRoutes = require('express').Router();
const { createUser, loginUser } = require('../controllers/authController')

authRoutes.post('/register', createUser)
authRoutes.post('/login', loginUser)

module.exports = authRoutes;