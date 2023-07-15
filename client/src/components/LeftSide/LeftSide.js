import React from 'react'
import ProfileCard from '../profileCard/ProfileCard'
import './leftside.css'

const LeftSide = () => {
  return (
    <div className='profile'>
       <span>Vertives</span>
        <ProfileCard />
        <button className='button s-button'>Share</button>
    </div>
  )
}

export default LeftSide