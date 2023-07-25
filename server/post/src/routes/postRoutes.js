const  postRoutes = require('express').Router();
const {createPost, likePost, getAllPosts, getFollowingPosts, getSinglePost, unlikePost, deletePost, getFollowingUserPosts} = require('../controllers/postController')
const { sessionAuth } = require('../middlewares/sessionMiddleware')
const newPostMiddleware = require('../middlewares/newPostMiddleware')

postRoutes.use(sessionAuth)
postRoutes.post('/post/new', newPostMiddleware, createPost)
postRoutes.get('/post', getSinglePost)
postRoutes.post('/post/like', likePost)
postRoutes.delete('/post', deletePost)
postRoutes.delete('/post/unlike', unlikePost)
postRoutes.get('/feed/all', getAllPosts)
postRoutes.get('/feed/:userId', getFollowingUserPosts)
postRoutes.get('/feed/following/:userId', getFollowingPosts)


module.exports = postRoutes;