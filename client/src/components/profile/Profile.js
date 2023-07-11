import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import ProfileCard from '../profileCard/ProfileCard'
import './profile.css'

const Profile = () => {
  return (
    <div className='profile'>
        <LogoSearch />
        <ProfileCard />
    </div>
  )
}

export default Profile