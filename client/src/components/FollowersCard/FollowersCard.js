import React from 'react'
import './followerscard.css'

import { Followers } from '../../data/followersData'

function FollowersCard() {
  return (
    <div className='followerscard'>
        <h3>Who to follow</h3>

        {Followers.map((follower, id)=>{
            return(
                <div className='follower' key={id}>
                    <div>
                        <img src={follower.profilePicture} alt='' className='followerImg' />
                        <div className='name'>
                            <span className='fname'>{follower.name}</span>
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