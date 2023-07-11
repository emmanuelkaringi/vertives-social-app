import React from 'react'
import './logosearch.css'

const LogoSearch = () => {
  return (
    <div className='logosearch'>
      <h4>Vertives</h4>
      <div className='search'>
        <input type='text' placeholder='Search Vertives'/>
        <i className="fa fa-magnifying-glass search-icon"></i>
      </div>
    </div>
  )
}

export default LogoSearch