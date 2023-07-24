const  commentRoutes = require('express').Router();
const { createComment, getComments, likeComment, unlikeComment, deleteComment, createReply, getReplies, deleteReply }= require('../controllers/commentController')
const { sessionAuth } = require('../middlewares/sessionMiddleware')


//commentRoutes.use(sessionAuth)
commentRoutes.post('/post/comment', createComment)
commentRoutes.get('/post/comments/:post_id', getComments)
commentRoutes.post('/post/comments/like', likeComment)
commentRoutes.post('/post/comments/unlike', unlikeComment)
commentRoutes.delete('/post/comments', deleteComment)


commentRoutes.post('/post/comments/reply', createReply)
commentRoutes.get('/post/comments/replies', getReplies)
commentRoutes.delete('/post/comments/reply', deleteReply)


module.exports = commentRoutes;