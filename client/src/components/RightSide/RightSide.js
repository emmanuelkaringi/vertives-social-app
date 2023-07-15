import React, {useState} from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import FollowersCard from '../FollowersCard/FollowersCard'
import './RightSide.css'

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false)
  return (
    <div className='RightSide'>
        <LogoSearch />
        <FollowersCard />
    </div>
  )
}

export default RightSide