import React from 'react';
import './post.css';

const Post = ({ post }) => {
  return (
    <div className="Post">
      <div className="detail">
        <p className="username">
          <b>@{post.username}</b>
        </p>
        <p> {post.content_txt}</p>
      </div>

      {post.media_url && <img src={post.media_url} alt="" />}

      <div className="postReact">
        <span>
          {post.liked ? <i className="fa fa-thumbs-up" /> : <i className="fa fa-thumbs-down" />}
        </span>
        <span>
          <i className="fa fa-comment"></i>
        </span>
        <span>
          <i className="fa fa-share-nodes"></i>
        </span>
      </div>

      <div className="reactDetails">
        <span>
          {post.like_count} <b>likes</b>
        </span>
        <span>
          {post.comment_count} <b>comments</b>
        </span>
      </div>
    </div>
  );
};

export default Post;