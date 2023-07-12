import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import PostShare from '../PostShare/PostShare'
import './post.css'

const Post = () => {
  return (
    <div className='postside'>
        <LogoSearch />
        <PostShare />
    </div>
  )
}

export default Post