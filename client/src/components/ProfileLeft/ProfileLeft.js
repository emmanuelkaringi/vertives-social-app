import React from 'react'
import FollowersCard from '../FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import './profileleft.css'

const ProfileLeft = () => {
  return (
    <div className='ProfileLeft'>
        <span>Vertives</span>
        <InfoCard />
    </div>
  )
}

export default ProfileLeft