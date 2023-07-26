import React from 'react'
import {Link} from "react-router-dom";
import './navbar.css'

function NavBar() {
  return (
    <div className='navIcons'>
        <Link style={{textDecoration: "none", color: "inherit"}} to = '/feed'>{<i className="fa fa-house"/>} </Link>
        <i className="fa fa-bell"></i>
        <Link style={{textDecoration: "none", color: "inherit"}} to = '/profile/:id'>{<i className="fa fa-gear"/>}</Link>
        <i className="fa fa-envelope"></i>
      </div>
  )
}

export default NavBar