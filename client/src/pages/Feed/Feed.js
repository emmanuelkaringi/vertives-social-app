import React from 'react';
import Profile from '../../components/profile/Profile';
import './feed.css'

const Feed = () => {
  return (
    <div className='feed'>
      <Profile />
        <div className='postShow'>Post</div>
        <div className='followShow'>Follow</div>
    </div>
  )
}

export default Feed