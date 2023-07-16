import React from 'react';
import './post.css';

const Post = ({ data }) => {
  return (
    <div className="Post">
      <div className="detail">
        <span className="username">
          <b>@{data.username}</b>
        </span>
        <span> {data.content_txt}</span>
      </div>

      {data.media_url && <img src={data.media_url} alt="" />}

      <div className="postReact">
        <span>
          {data.liked ? <i className="fa fa-thumbs-up" /> : <i className="fa fa-thumbs-down" />}
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
          {data.like_count} <b>likes</b>
        </span>
        <span>
          {data.comment_count} <b>comments</b>
        </span>
      </div>
    </div>
  );
};

export default Post;