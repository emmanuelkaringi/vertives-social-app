import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; //
import "./post.css";

const Post = ({ post }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(post.liked);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setLiked(post.liked); // Set the initial liked state based on the post.liked value
  }, [post.liked]);

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const formattedTime = moment.utc(post.created_at).format("ddd, h:mm A");

  const handleCommentChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (commentText.trim() === "") {
      return;
    }

    try {
      const newComment = {
        user_id: user.user_id,
        post_id: post.post_id,
        comment_txt: commentText,
      };

      const response = await axios.post(
        "http://localhost:4020/post/comment",
        newComment,
        { withCredentials: true }
      );

      if (response.data.data) {
        setComments([...comments, response.data.data]);
        setCommentText(""); // Clear the comment text field after submission

        // Update the comment count in the parent Posts component
        post.comment_count += 1;
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  // Fetch comments for this post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4020/post/comments/${post.post_id}`,
          { withCredentials: true }
        );
        setComments(response.data.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [commentText, post.post_id]);

  const handleLikeClick = async () => {
    try {
      if (liked) {
        // User has already liked the post, so proceed to unlike the post
        handleUnlikeClick();
      } else {
        // User has not liked the post, so proceed to like the post
        const response = await axios.post(
          "http://localhost:4020/post/like",
          {
            sender_id: user.user_id,
            post_id: post.post_id,
          },
          { withCredentials: true }
        );
        console.log(response);
        if (response.data.success) {
          setLiked(true); // Update the state to show the thumbs-up icon
          post.like_count += 1; // Increment the like count in the parent Posts component
          toast.success("Post liked successfully"); // Display a success toast message
        }
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Function to handle the unlike button click
  const handleUnlikeClick = async () => {
    try {
      const response = await axios.delete("http://localhost:4020/post/unlike", {
        data: { sender_id: user.user_id, post_id: post.post_id }, // Send the data in the request body
        withCredentials: true,
      });

      console.log(response);
      if (response.data.success) {
        setLiked(false); // Update the state to show the regular thumbs-up icon
        post.like_count -= 1; // Decrement the like count in the parent Posts component
      }
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  return (
    <>
      <div className="Post">
        <div className="profile-container">
          <img className="profile-img" src={post.profilepic_url} alt="" />
          <p className="username">
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/profile/${post.user_id}`}
            >
              @{post.username}
            </Link>
          </p>
        </div>
        <div className="Post-content">{post.content_txt}</div>

        {post.media_url && (
          <img className="Post-media" src={post.media_url} alt="" />
        )}

        <div className="postReact">
          <span onClick={liked ? handleUnlikeClick : handleLikeClick}>
            {liked ? (
              <i className="fa fa-thumbs-up" />
            ) : (
              <i className="fa-regular fa-thumbs-up" />
            )}
          </span>
          <span onClick={toggleComments}>
            <i className="fa fa-comment" />
          </span>
          <span>
            <i className="fa fa-share-nodes" />
          </span>
        </div>
        <div className="reactDetails">
          <span>
            {post.like_count} <b>likes</b>
          </span>
          <span onClick={toggleComments}>
            {post.comment_count} <b>comments</b>
          </span>
          <span>{formattedTime}</span>
        </div>

        {showComments && (
          <div className="commentsSection">
            <form onSubmit={handleCommentSubmit}>
              <input
                className="CommentShare"
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={handleCommentChange}
              />
              <button className="button cs-button" type="submit">
                Submit
              </button>
            </form>

            {comments.map((comment) => (
              <Comment key={comment.comment_id} comment={comment} />
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default Post;
