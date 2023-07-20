const  userRoutes = require('express').Router();
const { getAllProfiles, getUserProfile, updateUserProfile, deleteUserProfile, updatePassword } = require('../controllers/userController')
const { sessionAuth } = require('../middlewares/sessionMiddleware')
const newPassMiddleware = require('../middlewares/newPassMiddleware')

//userRoutes.use(sessionAuth)
userRoutes.get('/profile/all', getAllProfiles)
userRoutes.get('/profile/:userId', getUserProfile)
userRoutes.put('/profile/:userId', updateUserProfile)
userRoutes.delete('/profile/:userId', deleteUserProfile)
userRoutes.put('/profile/password/:userId', newPassMiddleware, updatePassword)

module.exports = userRoutes;