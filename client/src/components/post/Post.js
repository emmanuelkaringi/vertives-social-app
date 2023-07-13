import React from 'react'
import './post.css'

const Post = ({data}) => {
  return (
    <div className='Post'>
          <div className='detail'>
            <span className='username'><b>@{data.username}</b></span>
            <span> {data.content_txt}</span>
        </div>

        <img src={data.media_url} alt='' />

        <div className='postReact'>
            <span>{data.liked?<i class="fa fa-thumbs-up"/>:<i class="fa fa-thumbs-down"/>}</span>
            <span><i class="fa fa-comment"></i></span>
            <span><i class="fa fa-share-nodes"></i></span>
        </div>

        <div className='reactDetails'>
            <span>{data.like_count} <b>likes</b></span>
            <span>{data.comment_count} <b>comments</b></span>
        </div>

    </div>
  )
}

export default Post