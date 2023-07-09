async function createComment(req, res) {
    try {
        let { user_id, post_id, comment_txt } = req.body;
        const pool = req.pool;

        if (pool.connected) {
            let results = await pool.request()
                .input("user_id", user_id)
                .input("post_id", post_id)
                .input("comment_txt", comment_txt)
                .execute('social.AddComment');

            console.log(results);

            res.json({
                success: true,
                message: "Comment added successfully",
                data: results.recordsets[0]
            });
        } else {
            throw new Error("Internal server error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to add comment",
            error: error.message
        });
    }
}

async function getComments(req, res) {
    try {
      const { post_id } = req.body;
      const pool = req.pool;
  
      if (pool.connected) {
        const request = pool.request();
        request.input('postID', post_id);
        const result = await request.execute('social.GetPostComments');
  
        res.json({
          success: true,
          message: "Comments retrieved successfully",
          data: result.recordset
        });
      } else {
        throw new Error("Internal server error");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to get comments",
        error: error.message
      });
    }
  }
  

async function likeComment(req, res) {
    try {
        let { sender_id, comment_id } = req.body;
        const pool = req.pool;

        if (pool.connected) {
            let results = await pool.request()
                .input("sender_id", sender_id)
                .input("comment_id", comment_id)
                .execute('social.LikeComment');

                if (results.rowsAffected[0] > 0) {
                    res.json({
                        success: true,
                        message: "Comment liked successfully",
                    });
            } else if (results.rowsAffected[0] < 0) {
                res.json({
                    success: false,
                    message: "You have already liked this comment",
                });
            } else {
                throw new Error("Unexpected result from stored procedure");
            }
        } else {
            throw new Error("Internal server error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to like comment",
            error: error.message
        });
    }
}

async function unlikeComment(req, res) {
    try {
        let { sender_id, comment_id } = req.body;
        const pool = req.pool;

        if (pool.connected) {
            let results = await pool.request()
                .input("sender_id", sender_id)
                .input("comment_id", comment_id)
                .execute('social.UnlikeComment');

            if (results.rowsAffected[0] > 0) {
                res.json({
                    success: true,
                    message: "Comment unliked",
                });
            } else {
                res.json({
                    success: false,
                    message: "You have already unliked this comment",
                });
            }
        } else {
            throw new Error("Internal server error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to unlike comment",
            error: error.message
        });
    }
}

async function deleteComment(req, res) {
    try {
      const { comment_id } = req.body;
      const pool = req.pool;
  
      if (pool.connected) {
        const result = await pool
          .request()
          .input("commentId", comment_id)
          .execute("social.DeleteComment");
  
        // Check if any rows were affected by the deletion
        if (result.rowsAffected[2] > 0) {
          res.json({
            success: true,
            message: "Comment deleted successfully",
          });
        } else {
          res.status(404).json({
            success: false,
            message: "Comment not found",
          });
        }
      } else {
        throw new Error("Internal server error");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to delete comment",
        error: error.message,
      });
    }
  }  

async function createReply(req, res) {
    try {

        let { user_id, comment_id, reply_txt } = req.body;
        const pool = req.pool;

        if (pool.connected) {
            let results = await pool.request()
                .input("user_id", user_id)
                .input("comment_id", comment_id)
                .input("reply_txt", reply_txt)
                .execute('social.AddReply');

            console.log(results);

            res.json({
                success: true,
                message: "Reply added successfully",
                data: results.recordsets[0]
            });
        } else {
            throw new Error("Internal server error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to add reply",
            error: error.message
        });
    }
}

async function getReplies(req, res) {
    try {
      const { comment_id } = req.body;
      const pool = req.pool;
  
      if (pool.connected) {
        const request = pool.request()
                        .input('comment_id', comment_id);
        const result = await request.execute('social.GetReplies');
  
        res.json({
          success: true,
          message: "Replies retrieved successfully",
          data: result.recordset
        });
      } else {
        throw new Error("Internal server error");
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to get replies",
        error: error.message
      });
    }
  }
  
async function deleteReply(req, res) {
    try {
        const { reply_id } = req.body;
        const pool = req.pool;

        if (pool.connected) {
            const result = await pool.request()
                .input("reply_id", reply_id)
                .execute("social.DeleteReply");

            // Check if any rows were affected by the deletion
            if (result.rowsAffected[0] > 0) {
                res.json({
                    success: true,
                    message: "Reply deleted successfully",
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Reply not found",
                });
            }
        } else {
            throw new Error("Internal Error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete reply",
            error: error.message,
        });
    }
}

module.exports = { createComment, getComments, likeComment, unlikeComment, deleteComment, createReply, getReplies, deleteReply };