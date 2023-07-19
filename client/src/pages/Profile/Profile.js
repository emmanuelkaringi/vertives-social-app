import React from 'react'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import NavBar from '../../components/NavBar/NavBar'
import ProfileCard from '../../components/profileCard/ProfileCard'
import PostShare from '../../components/PostShare/PostShare'
import Posts from '../../components/posts/Posts'
import RightSide from '../../components/RightSide/RightSide'
import './profile.css'

const Profile = () => {
  return (
    <div className='Profile'>
        <ProfileLeft />

        <div className='profile-center'>
            <NavBar />
            <ProfileCard location = {"profilePage"}/>
            <PostShare />
            <Posts />
        </div>

        <RightSide />
    </div>
  )
}

export default Profile