import React from 'react'
import {NavLink} from "react-router-dom";
const Aside = () => {
  return (
    <div style={{display:"flex",flexDirection:'column'}}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/bookmark">BookMark</NavLink>
        <button>Logout</button>
    </div>
  )
}


export default Aside;
