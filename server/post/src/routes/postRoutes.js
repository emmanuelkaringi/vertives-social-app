const  postRoutes = require('express').Router();
const {createPost, likePost, getAllPosts, getFollowingPosts, deletePost} = require('../controllers/postController')
const { sessionAuth } = require('../middlewares/sessionMiddleware')
const newPostMiddleware = require('../middlewares/newPostMiddleware')

// userRoutes.use(sessionAuth)
// userRoutes.get('/profile', getUserProfile)
// userRoutes.put('/profile/:userId', updateUserProfile)
// userRoutes.delete('/profile/:userId', deleteUserProfile)
// userRoutes.put('/profile/password/:userId', newPassMiddleware, updatePassword)

module.exports = postRoutes;