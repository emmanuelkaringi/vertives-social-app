import React, { useState } from 'react'
import ProfileModal from '../ProfileModal/ProfileModal'
import './infocard.css'

const InfoCard = () => {

  const [modalOpened, setModalOpened] = useState(false)

  return (
    <div className='InfoCard'>
        <div className='info-head'>
            <h4>Your Info</h4>
            <span><i class="fa fa-pen" onClick={()=>setModalOpened(true)}></i></span>
            <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
        </div>

        <div className='info'>
            <span><b>DOB: </b></span>
            <span>2000/02/01</span>
        </div>

        <div className='info'>
            <span><b>City: </b></span>
            <span>Nairobi</span>
        </div>

        <button className='button logout'>Logout</button>
    </div>
  )
}

export default InfoCard