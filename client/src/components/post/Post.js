import React from "react";
import moment from "moment";
import ProfileImg from "../../img/profile.jpg";
import "./post.css";

const Post = ({ post }) => {
  const formattedTime = moment.utc(post.created_at).format("ddd, h:mm A");
  return (
    <div className="Post">
      <div className="profile-container">
        <img className="profile-img" src={post.profilepic_url} alt="" />
        <p className="username">
          <b>@{post.username}</b>
        </p>
      </div>
      <div className="Post-content">{post.content_txt}</div>

      {post.media_url && (
        <img className="Post-media" src={post.media_url} alt="" />
      )}

      <div className="postReact">
        <span>
          {post.liked ? (
            <i className="fa fa-thumbs-up" />
          ) : (
            <i className="fa fa-thumbs-down" />
          )}
        </span>
        <span>
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
        <span>
          {post.comment_count} <b>comments</b>
        </span>
        <span>{formattedTime}</span>
      </div>
    </div>
  );
};

export default Post;
