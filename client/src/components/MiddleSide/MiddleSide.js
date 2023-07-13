import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import PostShare from '../PostShare/PostShare'
import Posts from '../posts/Posts'
import './MiddleSide.css'

const MiddleSide = () => {
  return (
    <div className='postside'>
      <div className='navIcons'>
        <i class="fa fa-house"></i>
        <i class="fa fa-bell"></i>
        <i class="fa fa-gear"></i>
        <i class="fa fa-envelope"></i>
      </div>
      
        <PostShare />
        <Posts />
    </div>
  )
}

export default MiddleSide