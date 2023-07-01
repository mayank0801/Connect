import React, { useContext } from 'react'
import { SearchUser } from '../SearchUser/SearchUser'
import { PostContext } from '../../context/PostContext'
import { AuthContext } from '../../context/AuthContext';
import { suggestedUser } from '../../utlis/utlis';
import { followUser, loaduserHandler } from '../../services/postServices';
import {AiOutlinePlus} from "react-icons/ai";
import { useEffect } from 'react';
import "./AsideRight.css"

export const  AsideRight= () => {

    const {state:{users}}=useContext(PostContext);
    const {userInfo}=useContext(AuthContext);

    const suggestedInfo=suggestedUser(users,userInfo);
    const {token,updateUser}=useContext(AuthContext);

    
  return (
    <div className='aside-Right'>
        <SearchUser/>
        <div className='user-container'>
          <h2>Who To Follow</h2>
        {
            suggestedInfo.map((user)=>
            <div className='suggestedUser'>
              <span className='suggestedUserInfo'>
                <img className='suggestedUser-image' src={user.profileAvatar} alt='i'/>
                <h3>{user.username}</h3>
              </span>
                <AiOutlinePlus size={20} onClick={()=>followUser(user._id,token,updateUser,loaduserHandler)}/>
              </div>)
        }
        </div>
    </div>
  )
}