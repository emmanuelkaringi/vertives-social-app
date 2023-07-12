import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard'
import FollowersCard from '../FollowersCard/FollowersCard'
import './profile.css'

const Profile = () => {
  return (
    <div className='profile'>
        <LogoSearch />
        <ProfileCard />
        <FollowersCard />
    </div>
  )
}

export default Profile