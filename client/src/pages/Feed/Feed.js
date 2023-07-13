import React from 'react';
import LeftSide from '../../components/LeftSide/LeftSide';
import MiddleSide from '../../components/MiddleSide/MiddleSide';
import './feed.css'

const Feed = () => {
  return (
    <div className='feed'>
      <LeftSide />
      <MiddleSide />
        <div className='followShow'>Follow</div>
    </div>
  )
}

export default Feed