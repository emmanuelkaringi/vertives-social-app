import React from "react";
import moment from "moment";
import { useSelector } from "react-redux"; // Import the useSelector hook from react-redux
import "./comment.css";

const Comment = ({ comment }) => {
  const loggedInUser = useSelector((state) => state.authReducer.authData); // Access user information from Redux store

  const isCommentByLoggedInUser = loggedInUser && loggedInUser.user_id === comment.user_id;

  const formattedTime = moment.utc(comment.created_at).format("ddd, h:mm A");
  return (
    <div className="Comment">
      <div className="profile-container">
        <img className="profile-img" src={comment.profilepic_url} alt="" />
        <p className="username">
          <b>@{comment.username}</b>
        </p>
      </div>
      <div className="Comment-content">{comment.comment_txt}</div>
      {isCommentByLoggedInUser && <p>You are the author of this comment.</p>}
      
      <div className="reactDetails">
        <span>{formattedTime}</span>
      </div>
    </div>
  );
};

export default Comment;