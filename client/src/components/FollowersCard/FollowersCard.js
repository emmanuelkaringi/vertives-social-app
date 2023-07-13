import React from 'react'
import './followerscard.css'

import { Followers } from '../../data/followersData'

function FollowersCard() {
  return (
    <div className='followerscard'>
        <h3>People who follow you</h3>

        {Followers.map((follower, id)=>{
            return(
                <div className='follower'>
                    <div>
                        <img src={follower.profilePicture} alt='' className='followerImg' />
                        <div className='name'>
                            <span>{follower.name}</span>
                            <span>@{follower.username}</span>
                        </div>
                    </div>
                    <button className='button fc-button'>Follow</button>
                </div>
            )
        })}
    </div>
  )
}

export default FollowersCard