const  friendshipRoutes = require('express').Router();
const { getFollowers, getFollowing, followUser, unFollowUser } = require('../controllers/friendshipController')
const { sessionAuth } = require('../middlewares/sessionMiddleware')


friendshipRoutes.use(sessionAuth)
friendshipRoutes.get('/user/followers/:userId', getFollowers)
friendshipRoutes.get('/user/following/:userId', getFollowing)

module.exports = friendshipRoutes;