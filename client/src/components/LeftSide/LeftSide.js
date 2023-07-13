import React from 'react'
//import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard'
import FollowersCard from '../FollowersCard/FollowersCard'
import './leftside.css'

const LeftSide = () => {
  return (
    <div className='profile'>
       <span>Vertives</span>
        <ProfileCard />
        <FollowersCard />
    </div>
  )
}

export default LeftSide