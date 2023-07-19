import React, { useEffect, useState } from 'react'
import ProfileModal from '../ProfileModal/ProfileModal'
import * as UserApi from '../../api/UserRequest.js'
import './infocard.css'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const InfoCard = () => {

  const [modalOpened, setModalOpened] = useState(false)
  const dispatch = useDispatch()
  const params = useParams()

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({})
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(()=> {
    const fetchProfileUser = async()=> {
      if(profileUserId === user.user_id){
        setProfileUser(user)
        console.log(user)
      }
      else {
        const profileUser = await UserApi.getUser(profileUserId)
        setProfileUser(profileUser)
        console.lof(profileUser)
      }
    }
    fetchProfileUser();
  },[user])

  return (
    <div className='InfoCard'>
        <div className='info-head'>
            <h4>User Info</h4>
            {user.user_id === profileUserId ? (
              <span><i className="fa fa-pen" onClick={()=>setModalOpened(true)}/> <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened}/></span>
            ) : ""}
            
        </div>

        <div className='info'>
            <span><b>DOB: </b></span>
            <span>{profileUser.DOB}</span>
        </div>

        <div className='info'>
            <span><b>City: </b></span>
            <span>{profileUser.city}</span>
        </div>

        <button className='button logout'>Logout</button>
    </div>
  )
}

export default InfoCard