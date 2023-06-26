import React, { useContext } from 'react'
import "./Aside.css"
import {NavLink} from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
const Aside = () => {
  const {userInfo,logoutHandler}=useContext(AuthContext);
  return (
    <nav className='nav-container'>
        <NavLink className="nav-items" to="/">Home</NavLink>
        <NavLink className="nav-items" to="/explore">Explore</NavLink>
        <NavLink className="nav-items" to="/bookmark">BookMark</NavLink>
        <NavLink className="nav-items" to={`/profile/${userInfo?.username}`}>Profile</NavLink>
        <NavLink className="nav-items" onClick={logoutHandler}>Logout</NavLink>
    </nav>
  )
}


export default Aside;
