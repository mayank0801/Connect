import React, { useContext } from 'react'
import { SearchUser } from '../SearchUser/SearchUser'
import { PostContext } from '../../context/PostContext'
import { AuthContext } from '../../context/AuthContext';
import { suggestedUser } from '../../utlis/utlis';
import { followUser, loaduserHandler } from '../../services/postServices';
import {AiOutlinePlus} from "react-icons/ai";
import { useEffect } from 'react';

export const  AsideRight= () => {

    const {state:{users}}=useContext(PostContext);
    const {userInfo}=useContext(AuthContext);

    const suggestedInfo=suggestedUser(users,userInfo);
    const {token,updateUser}=useContext(AuthContext);

    
  return (
    <div>
        <SearchUser/>
        {
            suggestedInfo.map((user)=><div>
                <img src={user.profileAvtar} alt='i'/>
                <h2>{user.username}</h2>
                <AiOutlinePlus onClick={()=>followUser(user._id,token,updateUser,loaduserHandler)}/>
                
                </div>)
        }
    </div>
  )
}
