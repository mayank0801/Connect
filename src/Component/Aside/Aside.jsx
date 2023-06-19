import React from 'react'
import "./Aside.css"
import {NavLink} from "react-router-dom";
const Aside = () => {
  return (
    <nav className='nav-container'>
        <NavLink className="nav-items" to="/">Home</NavLink>
        <NavLink className="nav-items" to="/explore">Explore</NavLink>
        <NavLink className="nav-items" to="/bookmark">BookMark</NavLink>
        <NavLink className="nav-items" to="/tt">Profile</NavLink>
        <NavLink className="nav-items" to="/tt">Logout</NavLink>
    </nav>
  )
}


export default Aside;
