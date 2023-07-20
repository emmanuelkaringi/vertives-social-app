const  friendshipRoutes = require('express').Router();
const { getFollowers, getFollowing, followUser, unFollowUser } = require('../controllers/friendshipController')
const { sessionAuth } = require('../middlewares/sessionMiddleware')


friendshipRoutes.use(sessionAuth)
friendshipRoutes.get('/followers/:userId', getFollowers)
friendshipRoutes.get('/following/:userId', getFollowing)
friendshipRoutes.post('/follow/:userId', followUser);
friendshipRoutes.post('/unfollow/:userId', unFollowUser);

module.exports = friendshipRoutes;