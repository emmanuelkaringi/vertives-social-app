const  userRoutes = require('express').Router();
const { getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController')
const { sessionAuth } = require('../middlewares/sessionMiddleware')

userRoutes.use(sessionAuth)
userRoutes.get('/user/profile', getUserProfile)
userRoutes.put('/user/profile/:userId', updateUserProfile)
userRoutes.delete('/user/profile/:userId', deleteUserProfile)
// authRoutes.post('/login', loginUser)
// authRoutes.get('/logout', sessionAuth, logoutUser)

module.exports = userRoutes;