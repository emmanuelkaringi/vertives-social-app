const  friendshipRoutes = require('express').Router();
const { getFollowers, getFollowing, followUser, unFollowUser } = require('../controllers/friendshipController')
const { sessionAuth } = require('../middlewares/sessionMiddleware')


friendshipRoutes.use(sessionAuth)
friendshipRoutes.get('/user/followers/:userId', getFollowers)
friendshipRoutes.get('/user/following/:userId', getFollowing)
friendshipRoutes.post('/user/follow', followUser);
friendshipRoutes.post('/user/unfollow', unFollowUser);

module.exports = friendshipRoutes;