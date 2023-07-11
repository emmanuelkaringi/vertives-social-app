import React from 'react'
import './logosearch.css'

const LogoSearch = () => {
  return (
    <div className='logosearch'>
      <div className='search'>
        <i className="fa fa-magnifying-glass search-icon"></i>
        <input type='text' placeholder='Search Vertives'/>
      </div>
    </div>
  )
}

export default LogoSearch