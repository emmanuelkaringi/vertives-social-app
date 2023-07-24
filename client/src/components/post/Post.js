import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import Comment from "../Comment/Comment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./post.css";

const Post = ({ post }) => {
  const loggedInUser = useSelector((state) => state.authReducer.authData); // Access user information from Redux store
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

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
        user_id: loggedInUser.user_id,
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
        // console.log(response)
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
        // console.log(response.data.data)
        // console.log(response)
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [commentText, loggedInUser, post.post_id]);




  return (
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

      {post.media_url && <img className="Post-media" src={post.media_url} alt="" />}

      <div className="postReact">
        <span>
          {post.liked ? <i className="fa fa-thumbs-up" /> : <i className="fa fa-thumbs-down" />}
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
          {comments.map((comment) => (
            <Comment key={comment.comment_id} comment={comment} />
          ))}

          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={handleCommentChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Post;
