import React from 'react';
import Profile from '../../components/profile/Profile';
import Post from '../../components/post/Post';
import './feed.css'

const Feed = () => {
  return (
    <div className='feed'>
      <Profile />
      <Post />
        <div className='followShow'>Follow</div>
    </div>
  )
}

export default Feed