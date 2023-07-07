const  userRoutes = require('express').Router();
const { getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/userController')
const { sessionAuth } = require('../middlewares/sessionMiddleware')

userRoutes.use(sessionAuth)
userRoutes.get('/user/profile', getUserProfile)
userRoutes.put('/user/profile/:userId', updateUserProfile)
userRoutes.delete('/user/profile/:userId', deleteUserProfile)

module.exports = userRoutes;