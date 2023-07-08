const  commentRoutes = require('express').Router();
const { createComment, getComments, likeComment, deleteComment, createReply, deleteReply }= require('../controllers/commentController')
const { sessionAuth } = require('../middlewares/sessionMiddleware')


// friendshipRoutes.use(sessionAuth)
// friendshipRoutes.get('/followers/:userId', getFollowers)
// friendshipRoutes.get('/following/:userId', getFollowing)
// friendshipRoutes.post('/follow', followUser);
// friendshipRoutes.post('/unfollow', unFollowUser);

module.exports = commentRoutes;