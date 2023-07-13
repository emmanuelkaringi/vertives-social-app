import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import PostShare from '../PostShare/PostShare'
import Posts from '../posts/Posts'
import './MiddleSide.css'

const MiddleSide = () => {
  return (
    <div className='postside'>
        <LogoSearch />
        <PostShare />
        <Posts />
    </div>
  )
}

export default MiddleSide