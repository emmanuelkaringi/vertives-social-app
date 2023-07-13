import React from 'react'
import './infocard.css'

const InfoCard = () => {
  return (
    <div className='InfoCard'>
        <div className='info-head'>
            <h4>Your Info</h4>
            <span><i class="fa fa-pen"></i></span>
            
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