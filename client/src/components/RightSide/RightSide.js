import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import FollowersCard from '../FollowersCard/FollowersCard'
import './RightSide.css'

const RightSide = () => {
  return (
    <div className='RightSide'>
        <LogoSearch />
        <FollowersCard />
    </div>
  )
}

export default RightSide