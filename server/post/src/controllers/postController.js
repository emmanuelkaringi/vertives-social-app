async function createPost(req, res) {
    try {
        let { user_id, content_txt, media_url } = req.body;
        const pool = req.pool;

        if (pool.connected) {
            let results = await pool.request()
                .input("user_id", user_id)
                .input("content_txt", content_txt)
                .input("media_url", media_url)
                .execute('social.CreatePost');

            res.json({
                success: true,
                message: "Post created successfully",
                data: results.recordset
            });
        } else {
            throw new Error("Internal server error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create post",
            error: error.message
        });
    }
}

async function getAllPosts(req, res) {
    try {
        const pool = req.pool;

        if (pool.connected) {
            const request = pool.request();
            const result = await request.execute('social.GetPosts')

            res.json({
                success: true,
                message: "Posts retrieved successfully",
                data: result.recordset
            });
        }  else {
            throw new Error("Internal server error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to get posts",
            error: error.message
        }); 
    }
}

async function getFollowingUserPosts(req, res) {
    try {
        let userId = req.params;  // Assuming the user ID is in the "user_id" property of the request body
        const pool = req.pool;

        if (pool.connected) {
            let results = await pool.request()
                .input("user_id", userId)
                .execute('social.FollowingUser');

            res.json({
                success: true,
                message: "Posts retrieved successfully",
                data: results.recordset  // Use "recordset" instead of "recordsets" for a single result set
            });
        } else {
            throw new Error("Internal server error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch posts",
            error: error.message
        });
    }
}

async function getFollowingPosts(req, res) {
    try {
        let {userId} = req.params;  // Assuming the user ID is in the "user_id" property of the request body
        const pool = req.pool;

        if (pool.connected) {
            let results = await pool.request()
                .input("user_id", userId)
                .execute('social.GetPostsByFollowing');

            res.json({
                success: true,
                message: "Posts retrieved successfully",
                data: results.recordset  // Use "recordset" instead of "recordsets" for a single result set
            });
        } else {
            throw new Error("Internal server error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch posts",
            error: error.message
        });
    }
}


async function getSinglePost(req, res) {
    try {
        let postId = req.params;  // Assuming the user ID is in the "user_id" property of the request body
        const pool = req.pool;

        if (pool.connected) {
            let results = await pool.request()
                .input("post_id", postId)
                .execute('social.GetPostById');

            res.json({
                success: true,
                message: "Post retrieved successfully",
                data: results.recordset  // Use "recordset" instead of "recordsets" for a single result set
            });
        } else {
            throw new Error("Internal server error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch post",
            error: error.message
        });
    }
}

async function likePost(req, res) {
    try {
        let { sender_id, post_id } = req.body;
        const pool = req.pool;

        if (pool.connected) {
            let results = await pool.request()
                .input("sender_id", sender_id)
                .input("post_id", post_id)
                .execute('social.LikePost');

            // Check the output of the procedure to determine success or error
            if (results.output.message === "Post liked successfully") {
                res.json({
                    success: true,
                    message: results.output.message,
                });
            } else {
                res.json({
                    success: false,
                    message: results.output.message,
                });
            }
        } else {
            throw new Error("Internal server error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to like post",
            error: error.message
        });
    }
}

async function unlikePost(req, res) {
    try {
        let { sender_id, post_id } = req.body;
        const pool = req.pool;

        if (pool.connected) {
            let results = await pool.request()
                .input("sender_id", sender_id)
                .input("post_id", post_id)
                .execute('social.UnlikePost');

            if (results.rowsAffected[0] > 0) {
                res.json({
                    success: true,
                    message: "Post unliked successfully",
                });
            } else {
                res.json({
                    success: false,
                    message: "You have already unliked this post",
                });
            }
        } else {
            throw new Error("Internal server error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to unlike post",
            error: error.message
        });
    }
}




async function deletePost(req, res) {
    try {
        const { post_id } = req.body;
        const pool = req.pool;

        if (pool.connected) {
            const result = await pool.request()
                .input("post_id", post_id)
                .execute("social.DeletePost");

            // Check if any rows were affected by the deletion
            if (result.rowsAffected[0] > 0) {
                res.json({
                    success: true,
                    message: "Post deleted successfully",
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "Post not found",
                });
            }
        } else {
            throw new Error("Internal Error");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete post",
            error: error.message,
        });
    }
}


module.exports= {createPost, likePost, getAllPosts, getFollowingPosts, getSinglePost, unlikePost, deletePost, getFollowingUserPosts};