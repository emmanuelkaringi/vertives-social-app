const  friendshipRoutes = require('express').Router();
const { getFollowers, getFollowing, followUser, unFollowUser } = require('../controllers/friendshipController')
// const newUserMiddleware = require('../middlewares/newUserMiddleware')
// const { sessionAuth } = require('../middlewares/sessionMiddleware')

// friendshipRoutes.get('/user/profile', getUserProfile)
// userRoutes.put('/user/profile/:userId', updateUserProfile)
// userRoutes.delete('/user/profile/:userId', deleteUserProfile)
// authRoutes.post('/login', loginUser)
// authRoutes.get('/logout', sessionAuth, logoutUser)

module.exports = friendshipRoutes;