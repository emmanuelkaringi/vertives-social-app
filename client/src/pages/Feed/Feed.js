import React from 'react';
import LeftSide from '../../components/LeftSide/LeftSide';
import MiddleSide from '../../components/MiddleSide/MiddleSide';
import RightSide from '../../components/RightSide/RightSide';
import './feed.css'

const Feed = () => {
  return (
    <div className='feed'>
      <LeftSide />
      <MiddleSide />
      <RightSide />
    </div>
  )
}

export default Feed